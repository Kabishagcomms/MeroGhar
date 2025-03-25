"use client"
import { motion } from "framer-motion"
import Link from "next/link"

import Image from "next/image"
import { Building2, Heart, Home, MapPin, Shield, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Add this import
import { useTranslations } from 'next-intl'
import LanguageToggle from "../../../components/LanguageToggle"

export default function AboutUs() {
  // Add translation hook
  const t = useTranslations('about')

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dnimr7n8t/video/upload/v1742042592/1093658-uhd_3840_2160_30fps_upv76f.mp4"
            type="video/mp4"
          />
        </video>
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

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-rubik text-white mb-4">
              {t('hero.title')} <span className="text-[#886a52]">{t('hero.brandName')}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 font-rubik text-[#886a52]">{t('story.title')}</h2>
            <p className="text-blackd mb-4">
              {t('story.paragraph1')}
            </p>
            <p className="text-black mb-4">
              {t('story.paragraph2')}
            </p>
            <p className="text-black">
              {t('story.paragraph3')}
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742041071/pexels-hillaryfox-1595385_pduft3.jpg"
              alt={t('story.imageAlt')}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision - update background and icon colors */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAE7DD]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold font-rubik mb-4 text-[#99775C]">{t('mission.title')}</h2>

            <p className="text-black max-w-3xl mx-auto">
              {t('mission.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
                <Heart className="h-6 w-6 text-[#99775C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#99775C]">{t('mission.ourMission.title')}</h3>
              <p className="text-black tracking-tight">
                {t('mission.ourMission.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
                <Star className="h-6 w-6 text-[#99775C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#99775C]">{t('mission.ourVision.title')}</h3>
              <p className="text-black tracking-tight">
                {t('mission.ourVision.description')}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#99775C]">{t('values.title')}</h2>
          <p className="text-black tracking-tight max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Home className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">{t('values.authenticity.title')}</h3>
            <p className="text-black">{t('values.authenticity.description')}</p>
          </div>

          <div className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Users className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">{t('values.community.title')}</h3>
            <p className="text-black">{t('values.community.description')}</p>
          </div>

          <div className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Shield className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">{t('values.trust.title')}</h3>
            <p className="text-black">{t('values.trust.description')}</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#dbd7cc]"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#886a52]">{t('team.title')}</h2>
          <p className="text-black max-w-3xl mx-auto">{t('team.subtitle')}</p>
        </motion.div>

        <motion.div variants={staggerContainer} className="flex justify-center items-center w-full">
          {[
            {
              name: t('team.members.founder.name'),
              role: t('team.members.founder.role'),
              image: "https://res.cloudinary.com/dnimr7n8t/image/upload/v1742455413/Screenshot_2025-03-20_130811_dqv4mj.png",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all w-full max-w-sm"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-[#99775C]">
            {t('cta.title')}
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="px-8 bg-[#99775C] hover:bg-[#886a52] text-white">
                {t('cta.findStay')}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="px-8 border-[#99775C] text-[#99775C] hover:bg-[#99775C] hover:text-white">
                {t('cta.becomeHost')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}
