'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function StageReveal() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const leftCurtain = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-100%'])
  const rightCurtain = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [1.15, 1])

  return (
    <section ref={ref} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-accent">
          The Screen Opens
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl font-medium text-balance md:text-5xl">
          Where your celebration takes the stage
        </h2>

        <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-lg shadow-2xl">
          <motion.img
            style={{ scale }}
            src="/images/stage-reveal.png"
            alt="Grand wedding stage revealed as screen opens"
            className="h-full w-full object-cover"
          />
          <motion.div
            style={{ 
              x: leftCurtain,
              backgroundImage: 'url(/images/decorative-screen.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}
            className="absolute inset-y-0 left-0 w-1/2 shadow-[5px_0_15px_rgba(0,0,0,0.4)] z-10"
            aria-hidden="true"
          >
            {/* Elegant gold fringe trim on the opening right edge */}
            <div className="absolute inset-y-0 right-0 w-2.5 bg-gradient-to-b from-[#d4af37] via-[#f3e5ab] to-[#aa771c] border-l border-white/25 shadow-sm" />
          </motion.div>
          
          <motion.div
            style={{ 
              x: rightCurtain,
              backgroundImage: 'url(/images/decorative-screen.png)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat'
            }}
            className="absolute inset-y-0 right-0 w-1/2 shadow-[-5px_0_15px_rgba(0,0,0,0.4)] z-10"
            aria-hidden="true"
          >
            {/* Elegant gold fringe trim on the opening left edge */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-b from-[#d4af37] via-[#f3e5ab] to-[#aa771c] border-r border-white/25 shadow-sm" />
          </motion.div>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
          Scroll and watch the screen open — just as it will on your day. Every reveal,
          every light cue, every petal drop is choreographed to perfection.
        </p>
      </div>
    </section>
  )
}
