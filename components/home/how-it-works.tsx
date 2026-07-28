'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Check, MessageSquare, Sparkles, Send, MapPin, Calendar, Users } from 'lucide-react'

// Step data
interface Step {
  id: number
  title: string
  subtext: string
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Share your requirements',
    subtext: 'Tell us your event date, budget, location, type of venue, guest count, etc.',
  },
  {
    id: 2,
    title: 'Get a personalised proposal',
    subtext: 'Get the best deals on venue, catering, and decor as per your preferences.',
  },
  {
    id: 3,
    title: 'Confirm and book',
    subtext: 'Pay a minimum amount & lock the deal within 7 days. Leave the rest to us.',
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return
    if (latest < 0.33) {
      setActiveStep(1)
    } else if (latest < 0.66) {
      setActiveStep(2)
    } else {
      setActiveStep(3)
    }
  })

  useEffect(() => {
    if (isDesktop) return

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-step-id'))
          if (id) {
            setActiveStep(id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => {
      stepRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current)
      })
    }
  }, [isDesktop])

  const handleStepClick = (stepId: number) => {
    if (isDesktop) {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const containerStart = rect.top + scrollTop
      const containerHeight = rect.height
      const viewportHeight = window.innerHeight

      const scrollRange = containerHeight - viewportHeight

      let targetProgress = 0.15
      if (stepId === 2) targetProgress = 0.50
      if (stepId === 3) targetProgress = 0.85

      window.scrollTo({
        top: containerStart + scrollRange * targetProgress,
        behavior: 'smooth'
      })
    } else {
      const stepElement = stepRefs[stepId - 1].current
      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }

  // Floating decoration leaves/flowers for the illustration panel background
  const renderFloralBackground = () => (
    <svg
      className="absolute inset-0 w-full h-full text-[#E5D3B3]/20 pointer-events-none transition-transform duration-1000 ease-out"
      style={{ transform: `rotate(${(activeStep - 1) * 30}deg)` }}
      viewBox="0 0 400 400"
      fill="currentColor"
    >
      <defs>
        <path
          id="leaf"
          d="M 0 0 C 20 -20, 40 -20, 40 0 C 40 20, 20 20, 0 0 Z"
        />
        <g id="flower">
          <circle cx="0" cy="0" r="8" className="fill-[#C5A880]/30" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <use
              key={angle}
              href="#leaf"
              transform={`rotate(${angle}) translate(12, 0) scale(0.6)`}
              className="fill-[#E5D3B3]/40"
            />
          ))}
        </g>
      </defs>
      {/* Intricate concentric floral frames */}
      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4,6" fill="none" />
      <circle cx="200" cy="200" r="145" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="8,4" fill="none" />
      
      {/* Decorative floral elements around the ring */}
      <use href="#flower" x="200" y="45" />
      <use href="#flower" x="355" y="200" />
      <use href="#flower" x="200" y="355" />
      <use href="#flower" x="45" y="200" />
      
      <use href="#leaf" x="290" y="110" transform="rotate(45 290 110) scale(1.2)" />
      <use href="#leaf" x="290" y="290" transform="rotate(135 290 290) scale(1.2)" />
      <use href="#leaf" x="110" y="290" transform="rotate(225 110 290) scale(1.2)" />
      <use href="#leaf" x="110" y="110" transform="rotate(315 110 110) scale(1.2)" />
    </svg>
  )

  // Sub-illustration component for Step 1
  const renderStep1Illustration = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-full h-full flex items-center justify-center p-6"
    >
      <motion.img
        src="/images/how-it-works-step1.png"
        alt="Flora Concierge Share requirements"
        className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-cover rounded-full shadow-2xl border-4 border-[#E5D3B3]/30 z-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* Floating Requirement Tags around phone */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute top-8 left-[-16px] md:left-[-24px] bg-white shadow-lg border border-[#E5D3B3] rounded-2xl p-2 flex items-center gap-1.5 text-xs text-stone-700 font-sans z-20"
      >
        <div className="w-6 h-6 bg-[#FAF6F0] text-[#7A1D4B] rounded-lg flex items-center justify-center">
          <Calendar className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-[8px] text-stone-400 font-bold uppercase tracking-wider">Date</p>
          <p className="text-[10px] font-semibold">Dec 2026</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute bottom-12 right-[-16px] md:right-[-24px] bg-white shadow-lg border border-[#E5D3B3] rounded-2xl p-2 flex items-center gap-1.5 text-xs text-stone-700 font-sans z-20"
      >
        <div className="w-6 h-6 bg-[#FAF6F0] text-[#7A1D4B] rounded-lg flex items-center justify-center">
          <Users className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-[8px] text-stone-400 font-bold uppercase tracking-wider">Guests</p>
          <p className="text-[10px] font-semibold">300 Guests</p>
        </div>
      </motion.div>
    </motion.div>
  )

  // Sub-illustration component for Step 2
  const renderStep2Illustration = () => {
    // Helper to render marigold flower SVGs
    const Marigold = ({ size = 28, className = '' }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]`}
      >
        {/* Layered concentric petals of marigold */}
        {/* Outer petals: dark orange */}
        <g fill="#E65C00">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <path
              key={angle}
              d="M 50 50 C 40 20, 60 20, 50 50"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </g>
        {/* Mid petals: bright orange */}
        <g fill="#FF8C00">
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle) => (
            <path
              key={angle}
              d="M 50 50 C 42 28, 58 28, 50 50"
              transform={`rotate(${angle} 50 50) scale(0.85) translate(8, 8)`}
            />
          ))}
        </g>
        {/* Inner petals: yellow */}
        <g fill="#FFD700">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <circle
              key={angle}
              cx="50"
              cy="38"
              r="10"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </g>
        {/* Center core */}
        <circle cx="50" cy="50" r="12" fill="#E6A100" />
        <circle cx="50" cy="50" r="6" fill="#A83E00" />
      </svg>
    )

    return (
      <motion.div
        key="step2"
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -15 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full h-full flex items-center justify-center p-6"
      >
        <motion.img
          src="/images/how-it-works-step2.png"
          alt="Wedding invitation save the date"
          className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-cover rounded-full shadow-2xl border-4 border-[#E5D3B3]/30 z-10"
          animate={{ rotate: [-2, 2, -2], y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        {/* Extra floating marigolds outside */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-10 right-4 z-20"
        >
          <Marigold size={36} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute bottom-10 left-4 z-20"
        >
          <Marigold size={30} />
        </motion.div>
      </motion.div>
    )
  }

  // Sub-illustration component for Step 3
  const renderStep3Illustration = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-full h-full flex items-center justify-center p-6"
    >
      <motion.img
        src="/images/how-it-works-step3.png"
        alt="Wedding mandap confirmed"
        className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-cover rounded-full shadow-2xl border-4 border-[#E5D3B3]/30 z-10"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* Floating large pink checkmark above Mandap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: -8 }}
        transition={{
          delay: 0.3,
          type: 'spring',
          stiffness: 150,
          damping: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2.5
        }}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-pink-400 to-[#7A1D4B] rounded-full shadow-2xl flex items-center justify-center text-white border-2 border-white z-35"
      >
        <Check className="w-6 h-6 stroke-[3.5]" />
      </motion.div>
    </motion.div>
  )

  const renderIllustration = () => {
    switch (activeStep) {
      case 1:
        return renderStep1Illustration()
      case 2:
        return renderStep2Illustration()
      case 3:
        return renderStep3Illustration()
      default:
        return null
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative lg:h-[300vh] h-auto bg-[#FDFBF7] border-y border-[#E5D3B3]/25 font-sans"
    >
      {/* Decorative top border garland */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#E5D3B3] via-[#7A1D4B]/40 to-[#E5D3B3] z-20" />

      {/* Sticky Inner Wrapper */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center py-24 md:py-32 lg:py-0 w-full overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 flex flex-col items-center w-full">
        {/* Centered Header */}
        <div className="text-center max-w-xl mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#7A1D4B] tracking-tight leading-tight">
            How it works
          </h2>
          <p className="mt-3 text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-[0.25em]">
            Book your wedding service in 3 easy steps
          </p>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Two Columns Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Stepper Menu */}
          <div className="relative flex flex-col gap-10">
            
            {/* Dashed vertical line linking steps */}
            <div className="absolute left-4 md:left-6 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#E5D3B3] z-0 pointer-events-none -translate-x-1/2" />

            {/* Animated solid line overlay */}
            <motion.div
              className="absolute left-4 md:left-6 top-6 bottom-6 w-0.5 bg-[#7A1D4B] z-0 pointer-events-none -translate-x-1/2 origin-top"
              animate={isDesktop ? {} : { scaleY: (activeStep - 1) / (steps.length - 1) }}
              style={isDesktop ? { scaleY: scrollYProgress } : undefined}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {steps.map((step, index) => {
              const isActive = activeStep === step.id
              return (
                <div
                  key={step.id}
                  ref={stepRefs[index]}
                  data-step-id={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className="group relative flex items-start gap-4 md:gap-6 cursor-pointer select-none z-10 transition-all duration-300"
                >
                  {/* Step Number Circle */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-semibold border-2 transition-all duration-500 shadow-sm ${
                      isActive
                        ? 'bg-[#7A1D4B] border-[#7A1D4B] text-white scale-110 shadow-md shadow-[#7A1D4B]/20'
                        : 'bg-white border-[#E5D3B3] text-[#C5A880] group-hover:border-[#7A1D4B]/50 group-hover:text-[#7A1D4B]'
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1 md:pt-2">
                    {/* Step Title */}
                    <h3
                      className={`font-serif leading-tight transition-all duration-300 ${
                        isActive
                          ? 'text-lg md:text-2xl font-bold text-[#7A1D4B]'
                          : 'text-base md:text-xl font-medium text-[#C5A880] group-hover:text-[#7A1D4B]/80'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Subtext (Expanded when active) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            marginTop: 8,
                            transition: { height: { duration: 0.3 }, opacity: { duration: 0.25, delay: 0.05 } }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            transition: { height: { duration: 0.25 }, opacity: { duration: 0.15 } }
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-stone-600 text-xs md:text-sm leading-relaxed max-w-md font-sans">
                            {step.subtext}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side: Illustration Panel */}
          <div className="flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full bg-white/40 border border-[#E5D3B3]/40 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Subtle gold floral background pattern frame */}
              {renderFloralBackground()}
              
              {/* Central Dynamic Illustration area */}
              <div className="relative z-10 w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full flex items-center justify-center overflow-visible">
                <AnimatePresence mode="wait">
                  {renderIllustration()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Center CTA Button at the bottom */}
        <div className="mt-16 md:mt-24 text-center">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full bg-[#7A1D4B] hover:bg-[#601438] px-8 py-4.5 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-xl hover:shadow-[#7A1D4B]/20 transition-all duration-300 font-sans"
          >
            Start my wedding planning
          </motion.a>
        </div>
      </div>
    </div>
  </section>
)
}
