'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Pointer as Pinterest } from 'lucide-react';
import { motion } from 'framer-motion';
import useModal from '@/store/useModal';

const Footer = () => {
  const loginSignupModal = useModal();

  return (
    <footer className="bg-mainColor text-secondaryColor pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Left Column - Quick Links */}
          <div className="space-y-4">
            <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/about-us" className="block text-2xl hover:text-secondaryHover">
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="/contact-us" className="block text-2xl hover:text-secondaryHover">
                Support
              </Link>
            </motion.div>
          </div>

          {/* Middle Column - Categories */}
          <div>
            <div className="mb-8">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-sm font-medium text-secondaryColor mb-4"
              >
                TRAVEL
              </motion.h3>
              <div className="space-y-3">
                <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/Home/listnigs" className="block hover:text-secondaryHover">
                    What&apos;s New
                  </Link>
                </motion.div>
               
              </div>
            </div>
          
          </div>

          {/* Right Column - Title and Buttons */}
          <div>
            <motion.h2 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-4xl mb-8 text-secondaryColor font-inter"
            >
              Handpicked Homes
              <br />& Small Hotels
            </motion.h2>
            <div className="space-y-4">
              <motion.button 
                onClick={() => loginSignupModal.onOpen('signup')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-secondaryColor text-mainColor py-3 px-6 hover:bg-secondaryHover transition-colors"
              >
                REGISTER
              </motion.button>
              <motion.button 
                onClick={() => loginSignupModal.onOpen('login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-secondaryColor text-secondaryColor py-3 px-6 hover:bg-secondaryColor hover:text-mainColor transition-colors"
              >
                SIGN IN
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-6 mb-16"
        >
          {[Facebook, Instagram, Twitter, Pinterest, Linkedin].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="#" className="text-secondaryColor hover:text-secondaryHover">
                <Icon size={24} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-secondaryColor/80"
        >
          <motion.p whileHover={{ scale: 1.05 }}>© 2025 MERO GHAR INC.</motion.p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer;