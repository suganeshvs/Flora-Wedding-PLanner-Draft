'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start start', 'end start'] 
  })
  
  // Opacities for the 3 layered background images (Couple, Palace, Tablescape)
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.7, 0.85], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1])

  // Parallax Y translations for background depth
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['-5%', '15%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['-5%', '15%'])

  // Scales for a subtle zooming effect
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [1.08, 1.15])
  const scale2 = useTransform(scrollYProgress, [0.3, 0.85], [1.08, 1.15])
  const scale3 = useTransform(scrollYProgress, [0.7, 1], [1.08, 1.15])

  // Text parallax and fade out
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      
      {/* Background Slideshow Layer 1 (Couple) */}
      <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute inset-0 z-0">
        <motion.img
          style={{ scale: scale1 }}
          src="/images/hero-couple.png"
          alt="Bride and groom beneath a rose archway at golden hour"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Background Slideshow Layer 2 (Palace) */}
      <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute inset-0 z-0">
        <motion.img
          style={{ scale: scale2 }}
          src="/images/venue-palace.png"
          alt="Heritage Palace Wedding Venue at sunset"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Background Slideshow Layer 3 (Decor) */}
      <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute inset-0 z-0">
        <motion.img
          style={{ scale: scale3 }}
          src="/images/gallery-decor.png"
          alt="Luxury wedding reception table decorations"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/35 to-background" />

      {/* Hero Text Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center md:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="text-xs uppercase tracking-[0.5em] text-white/90 font-sans"
        >
          Flora
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="mt-3 font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-[0.18em] uppercase text-white leading-[0.95]"
        >
          Weddings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75 }}
          className="mt-8 max-w-xl font-serif text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed italic text-balance"
        >
          We don’t just celebrate life, we celebrate love
          <span className="block mt-2 text-xs sm:text-sm tracking-[0.25em] uppercase not-italic text-white/70">
            because love is the heart of everything
          </span>
        </motion.p>
      </motion.div>

      {/* Down arrow scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="h-10 w-px bg-white/60"
        />
      </motion.div>
    </section>
  )
}
