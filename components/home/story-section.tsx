'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn, WordReveal } from '@/components/motion-primitives'

export function StorySection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  // With 3 panels (300vw total width), we want to translate by 2 panels (200vw, which is -66.67% of 300vw)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.67%'])

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-secondary">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] items-center px-4 md:px-20">
          
          {/* Panel 1: Flora Intro */}
          <div className="flex h-full w-[100vw] flex-col justify-center pr-12 md:pr-32">
            <motion.p
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-7xl font-semibold text-primary md:text-9xl"
            >
              Flora
            </motion.p>
            <FadeIn delay={0.3}>
              <p className="mt-2 text-xs uppercase tracking-[0.4em] text-secondary-foreground/70">
                We&apos;ll tell your story
              </p>
            </FadeIn>
          </div>

          {/* Panel 2: The Philosophy */}
          <div className="flex h-full w-[100vw] flex-col justify-center px-12 md:px-32">
            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-snug text-secondary-foreground text-balance md:text-6xl">
              <WordReveal text="A wedding is not an event. It is the first chapter of forever, written in flowers, light, and laughter." />
            </h2>
            <FadeIn delay={0.5}>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-secondary-foreground/80 text-pretty md:text-lg">
                For over a decade, Flora has designed weddings that feel deeply personal —
                celebrations where every detail, from the invitation ink to the last firework,
                speaks in your voice. We listen first, then we build worlds.
              </p>
            </FadeIn>
          </div>

          {/* Panel 3: Founder Lakshmi Menon */}
          <div className="flex h-full w-[100vw] items-center justify-center px-12 md:px-32">
            <div className="grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
              <FadeIn className="relative mx-auto max-w-[240px] md:max-w-sm">
                <div className="absolute -inset-3 rounded-lg border border-primary/20" aria-hidden="true" />
                <img
                  src="/images/founder.png"
                  alt="Flora founder Lakshmi Menon"
                  className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-xl"
                />
              </FadeIn>
              <div>
                <FadeIn delay={0.2}>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary">The Visionary</p>
                  <h3 className="mt-3 font-serif text-3xl font-medium text-secondary-foreground md:text-4xl">
                    Lakshmi Menon
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-secondary-foreground/60">
                    Founder & Creative Director
                  </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="mt-6 text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
                    Lakshmi founded Flora with a simple belief: a wedding shouldn't feel like a template. 
                    Trained in floral design in Bengaluru and event styling in Mumbai, she curates each celebration 
                    as an immersive gallery of a couple's journey.
                  </p>
                  <p className="mt-4 font-serif text-base italic text-primary md:text-lg leading-relaxed">
                    &ldquo;Our purpose is to design a space where your memories stand tall, making it worthy of the promise you share.&rdquo;
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  )
}

export function WordCinema() {
  return (
    <section className="bg-primary py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
        <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/50">
          Our Promise
        </p>
        <p className="mt-8 font-serif text-4xl font-medium leading-snug text-primary-foreground text-balance md:text-6xl">
          <WordReveal
            text="You bring the love. We bring everything else."
            stagger={0.18}
          />
        </p>
      </div>
    </section>
  )
}
