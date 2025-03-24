"use client"
import { motion } from "framer-motion"
import Link from "next/link"

import Image from "next/image"
import { Building2, Heart, Home, MapPin, Shield, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutUs() {
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
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
        </motion.div>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-rubik text-white mb-4">
              About <span className=" text-[#886a52]"> Mero Ghar</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your home away from home, wherever your journey takes you
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - update heading colors */}
      <motion.section 
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 font-rubik text-[#886a52]">Our Story</h2>
            <p className="text-blackd mb-4">
              Founded in 2025, Mero Ghar began with a simple idea: to create a platform where travelers could find
              authentic, comfortable homes that feel like their own, no matter where they are in the world.
            </p>
            <p className="text-black mb-4">
              The name &quot;Mero Ghar,&quot; which means &quot;My Home&quot; in Nepali, reflects our commitment to providing accommodations
              that don&apos;t just serve as a place to stay, but as a true home during your travels.
            </p>
            <p className="text-black">
              What started as a small collection of curated properties has grown into a trusted platform connecting
              thousands of travelers with unique homes across the globe.
            </p>
          </motion.div>
          <motion.div 
            variants={scaleIn}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742041071/pexels-hillaryfox-1595385_pduft3.jpg"
              alt="Mero Ghar founding team"
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
            <h2 className="text-3xl font-bold font-rubik mb-4 text-[#EAE7DD]">Our Mission & Vision</h2>
            
            <p className="text-black max-w-3xl mx-auto">
              We&apos;re on a mission to revolutionize the way people experience travel accommodations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
                <Heart className="h-6 w-6 text-[#99775C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#99775C]">Our Mission</h3>
              <p className="text-black tracking-tight">
                To connect travelers with comfortable, authentic accommodations that enhance their travel experience,
                while empowering property owners to share their spaces with the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
                <Star className="h-6 w-6 text-[#99775C]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#99775C]">Our Vision</h3>
              <p className="text-black tracking-tight">
                To create a world where every traveler can feel at home anywhere, fostering cultural exchange and
                authentic connections between hosts and guests across the globe.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Values - update icon and heading colors */}
      <motion.section 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#99775C]">Our Values</h2>
          <p className="text-black tracking-tight max-w-3xl mx-auto">
            These core principles guide everything we do at Mero Ghar.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div 
           
            className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Home className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">Authenticity</h3>
            <p className="text-black">
              We believe in real homes, real experiences, and real connections between hosts and guests.
            </p>
          </div>

          <div 
           
            className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Users className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">Community</h3>
            <p className="text-black">
              We cover a large community of property owners and possible renters moving worldwide scale.
            </p>
          </div>

          <div 
            
          
            className="p-6 border-[#99775C] border rounded-lg hover:bg-[#EAE7DD] transition-all"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#dbd7cc]/20">
              <Shield className="h-6 w-6 text-[#99775C]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#99775C]">Trust & Safety</h3>
            <p className="text-black">
              We prioritize the security and comfort of our community through verified listings and secure transactions.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section - update background and text colors */}
      <motion.section 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#dbd7cc]"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#886a52]">Meet Our Team</h2>
          <p className="text-black max-w-3xl mx-auto">
            The passionate individuals behind Mero Ghar who work tirelessly to create exceptional experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="flex justify-center items-center w-full"
        >
          {/* Map through team members */}
          {[
            {
              name: "Kabisha Guragain",
              role: "Founder & CEO",
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

      {/* CTA Section - update button colors */}
      <motion.section 
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-4 text-[#99775C]"
          >
            Join the Mero Ghar Community
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="px-8 bg-[#99775C] hover:bg-[#886a52] text-white">
                Find a Stay
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="px-8 border-[#99775C] text-[#99775C] hover:bg-[#99775C] hover:text-white">
                Become a Host
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}
