"use client"

import type React from "react"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { useTranslations } from 'next-intl'

export default function NewsletterSignup() {
  const t = useTranslations('newsletter')
  const [agreed, setAgreed] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agreed) {
      toast.error("Please agree to receive the newsletter")
      return
    }
    
    if (!email || !firstName || !lastName) {
      toast.error("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await axios.post('http://localhost:2900/subscription/v1/subscribe', {
        firstName,
        lastName,
        email
      })
      
      if (response.data.success) {
        toast.success(response.data.message)
        // Reset form after successful submission
        setEmail("")
        setFirstName("")
        setLastName("")
        setAgreed(false)
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to subscribe. Please try again later."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full mt-5 bg-mainColor text-secondaryColor"
    >
      <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-24">
        <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-light font-inter mb-8 text-secondaryColor">
              {t('joinThe')} <motion.span 
                className="font-semibold text-secondaryColor"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Meroghar
              </motion.span> 
              <br />
              <span className="text-secondaryColor">{t('community')}</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-secondaryColor/80 tracking-normal mb-8 text-lg">
              {t('description')}
            </motion.p>
          </div>

          <motion.form variants={formVariants} onSubmit={handleSubmit} className="space-y-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Input
                  type="text"
                  placeholder={t('firstName')}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={cn(
                    "bg-transparent border-secondaryColor h-12 rounded-none",
                    "placeholder:text-secondaryColor/60 focus-visible:ring-secondaryColor",
                    "hover:border-secondaryHover transition-colors",
                  )}
                  disabled={isSubmitting}
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Input
                  type="text"
                  placeholder={t('lastName')}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={cn(
                    "bg-transparent border-secondaryColor h-12 rounded-none",
                    "placeholder:text-secondaryColor/60 focus-visible:ring-secondaryColor",
                    "hover:border-secondaryHover transition-colors",
                  )}
                  disabled={isSubmitting}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "bg-transparent border-secondaryColor h-12 rounded-none",
                  "placeholder:text-secondaryColor/60 focus-visible:ring-secondaryColor",
                  "hover:border-secondaryHover transition-colors",
                )}
                disabled={isSubmitting}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between gap-4" whileHover={{ scale: 1.02 }}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="border-secondaryColor data-[state=checked]:bg-secondaryColor data-[state=checked]:text-mainColor"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-secondaryColor/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('agreement')}
                </label>
              </div>

              <Button
                type="submit"
                className={cn(
                  "bg-secondaryColor hover:bg-secondaryHover text-mainColor h-12 rounded-none px-8",
                  "tracking-wider text-sm font-medium transition-colors",
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('sending')}
                  </span>
                ) : (
                  t('subscribe')
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  )
}

