"use client"

import Image from "next/image"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"


import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslations } from 'next-intl'

import LanguageToggle from "../../../components/LanguageToggle"

export default function ContactUs() {
  const t = useTranslations('contact')
  // Add form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: ""
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Map the select values to the expected backend values
    const subjectMapping: Record<string, string> = {
      "booking": "Booking Inquiry",
      "hosting": "Hosting Information",
      "support": "Customer Support",
      "feedback": "Feedback",
      "other": "Other"
    }

    const formPayload = {
      ...formData,
      subject: subjectMapping[formData.subject] || formData.subject
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('http://localhost:2900/contact/v1/contactUs', formPayload)

      if (response.data.success) {
        toast.success(response.data.message)
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: ""
        })
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to send your message. Please try again later."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add animation variants at the top of the component
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  const staggerChildren = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const cardAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    whileHover: { y: -5, transition: { duration: 0.2 } }
  }

  const formAnimation = {
    initial: { x: -30, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.6 }
  }

  const mapAnimation = {
    initial: { scale: 0.95, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 0.8 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-screen bg-[#EAE7DD]"
    >
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742445716/pexels-heyho-7746653_t9llcs.jpg"
          alt="Contact Mero Ghar"
          fill
          className="object-cover"
          priority
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/70"
        />
        {/* Add Back to Home button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-8 left-8 z-10"
        >
          <Link
            href="/Home"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#99775C]/20 backdrop-blur-sm rounded-lg text-white hover:bg-[#99775C]/40 transition-colors border border-[#99775C]/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
        </motion.div>

        {/* Add Language Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-8 right-8 z-10"
        >
          <LanguageToggle />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-rubik text-white mb-4">
              {t('title')} <span className="text-[#99775C]">Mero Ghar</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">{t('subtitle')}</p>
          </div>
        </motion.div>
      </section>

      {/* Contact Information */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl  mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Call Us Card */}
          <div>
            <Card className="flex flex-col items-center text-center p-6 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1d8096]/10">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contactInfo.callUs.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('contactInfo.callUs.description')}</p>
              <p className="font-medium">{t('contactInfo.callUs.phone1')}</p>
              <p className="font-medium">{t('contactInfo.callUs.phone2')}</p>
            </Card>
          </div>

          {/* Email Us Card */}
          <div>
            <Card className="flex flex-col items-center text-center p-6 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contactInfo.emailUs.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('contactInfo.emailUs.description')}</p>
              <p className="font-medium">{t('contactInfo.emailUs.email')}</p>
            </Card>
          </div>

          {/* Visit Us Card */}
          <div>
            <Card className="flex flex-col items-center text-center p-6 transition-colors">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contactInfo.visitUs.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('contactInfo.visitUs.description')}</p>
              <p className="font-medium">{t('contactInfo.visitUs.address1')}</p>
              <p className="font-medium">{t('contactInfo.visitUs.address2')}</p>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Contact Form and Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAE7DD]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <motion.div
              variants={formAnimation}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <h2 className="text-3xl font-bold mb-8 text-[#99775C]">{t('form.title')}</h2>
              <motion.form
                className="space-y-8"
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                onSubmit={handleSubmit}
              >
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        {t('form.firstName')}
                      </label>
                      <Input
                        id="firstName"
                        placeholder={t('form.firstNamePlaceholder')}
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        {t('form.lastName')}
                      </label>
                      <Input
                        id="lastName"
                        placeholder={t('form.lastNamePlaceholder')}
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t('form.email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      {t('form.phone')}
                    </label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder={t('form.phonePlaceholder')}
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      {t('form.subject')}
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={t('form.subjectPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">{t('form.subjects.booking')}</SelectItem>
                        <SelectItem value="hosting">{t('form.subjects.hosting')}</SelectItem>
                        <SelectItem value="support">{t('form.subjects.support')}</SelectItem>
                        <SelectItem value="feedback">{t('form.subjects.feedback')}</SelectItem>
                        <SelectItem value="other">{t('form.subjects.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      {t('form.message')}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t('form.messagePlaceholder')}
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-[#99775C] hover:bg-[#886a52] py-3 px-8 text-white font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          {t('form.sending')}
                        </>
                      ) : (
                        t('form.send')
                      )}
                    </Button>
                  </div>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl text-[#99775C] font-bold mb-4">{t('faq.title')}</h2>
          <p className="text-black max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-[#99775C]">{t('faq.questions.booking.title')}</h3>
            <p className="text-gray-600">
              {t('faq.questions.booking.answer')}
            </p>
          </div>

          <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-[#99775C]">{t('faq.questions.host.title')}</h3>
            <p className="text-gray-600">
              {t('faq.questions.host.answer')}
            </p>
          </div>

          <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-[#99775C]">{t('faq.questions.support.title')}</h3>
            <p className="text-gray-600">
              {t('faq.questions.support.answer')}
            </p>
          </div>

          <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-[#99775C]">{t('faq.questions.payment.title')}</h3>
            <p className="text-gray-600">
              {t('faq.questions.payment.answer')}
            </p>
          </div>
        </div>

        <motion.div className="text-center mt-12">
          <p className="text-black mb-6">
            {t('faq.notFound')}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block rounded-md bg-[#99775C] hover:bg-[#886a52] text-white px-8 py-2"
              onClick={() => {
                const event = new CustomEvent('openLoginModal');
                window.dispatchEvent(event);
              }}
            >
              {t('faq.startNow')}
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  )
}

