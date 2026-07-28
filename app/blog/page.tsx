'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHero } from '@/components/page-hero'
import { FadeIn } from '@/components/motion-primitives'
import { Calendar, MapPin, MessageSquare, BookOpen, Quote, Sparkles } from 'lucide-react'

// Categorized items: either a Journal Post or a User Review (Love Letter)
interface JournalItem {
  id: string
  type: 'wedding' | 'guide' | 'review'
  title: string
  subtitle: string
  date?: string
  location?: string
  image?: string
  rating?: number
  excerpt: string
  fullReview?: string
  author?: string
}

const journalItems: JournalItem[] = [
  {
    id: 'udaipur-dream',
    type: 'wedding',
    title: 'A Regal Udaipur Dream',
    subtitle: 'Ananya & Rohan’s Palace Celebration',
    date: 'Oct 14, 2025',
    location: 'Udaipur Palace',
    image: '/images/gallery-mandap.png',
    excerpt: 'A three-day royal celebration beneath towering orchid arches and traditional floral mandaps, curated down to the last custom tablescape detail.',
    author: 'Ananya & Rohan'
  },
  {
    id: 'goa-shores',
    type: 'wedding',
    title: 'Sun-Kissed Sand & Shorelines',
    subtitle: 'Meera & Daniel’s Seaside Vows',
    date: 'Dec 2, 2025',
    location: 'Goa Coastal Lawns',
    image: '/images/venue-beach.png',
    excerpt: 'A bohemian coastal sanctuary complete with custom pampas installations, seaside tablescapes, and a sunset ceremony that guests described as pure magic.',
    author: 'Meera & Daniel'
  },
  {
    id: 'floral-guide',
    type: 'guide',
    title: 'The Art of Sourcing Indian Blooms',
    subtitle: 'Creative Director’s Florals Playbook',
    date: 'Jan 18, 2026',
    location: 'Flora Design Studio',
    image: '/images/gallery-decor.png',
    excerpt: 'Our comprehensive playbook on selecting the perfect color palettes, sourcing seasonal local blossoms, and incorporating heritage floral themes into modern stages.'
  },
  {
    id: 'coorg-hills',
    type: 'wedding',
    title: 'Woven in the Hills of Coorg',
    subtitle: 'Kavya & Arjun’s Coffee Estate Vows',
    date: 'Feb 22, 2026',
    location: 'Coorg Estates',
    image: '/images/venue-garden.png',
    excerpt: 'An intimate family gathering set in deep estate greenery, utilizing grandmother’s handwoven family sarees for dining arches and local spices for table setups.',
    author: 'Kavya & Arjun'
  },
  // User Reviews (Love Letters)
  {
    id: 'review-1',
    type: 'review',
    title: 'An Unforgettable Three-Day Experience',
    subtitle: 'Ananya & Rohan (Palace Wedding)',
    location: 'Udaipur Palace',
    rating: 5,
    excerpt: 'Flora turned our three-day wedding into a film we get to rewatch forever. The stage design was breathtaking, but what impressed us most was how their coordinators managed the security and transit of 250 international guests without a single hitch. Our families felt like royalty.',
    author: 'Ananya & Rohan'
  },
  {
    id: 'review-2',
    type: 'review',
    title: 'Flawless Long-Distance Coordination',
    subtitle: 'Meera & Daniel (Beach Wedding)',
    location: 'Goa Coastal Lawns',
    rating: 5,
    excerpt: 'Planning an Indian wedding from London seemed impossible, but Lakshmi and the team became our eyes and hands. They managed the budget stewardship flawlessly and even setup mock trials over Zoom. The attention to detail on the custom linen and floral colors was absolute masterclass.',
    author: 'Meera & Daniel'
  },
  {
    id: 'review-3',
    type: 'review',
    title: 'A Green, Zero-Waste Masterpiece',
    subtitle: 'Kavya & Arjun (Garden Estate)',
    location: 'Coorg Estates',
    rating: 5,
    excerpt: 'We wanted a zero-waste wedding that respected the local ecosystem, and Flora delivered. They sourced wildflowers from surrounding fields and worked with local weavers to hand-craft biodegradable tablescapes. A deeply personal experience that reflected our core values.',
    author: 'Kavya & Arjun'
  },
  {
    id: 'review-4',
    type: 'review',
    title: 'Florist’s Eye & Production Mind',
    subtitle: 'Priya & Vikram (Heritage Mansion)',
    location: 'Jaipur Mansion',
    rating: 5,
    excerpt: 'Impeccable is the only word. Lakshmi Menon has a florist’s eye and a production director’s mind. She designed a customized canopy of hanging jasmine that guests are still talking about. Every single penny spent was visible in the sheer luxury of the final setup.',
    author: 'Priya & Vikram'
  },
  {
    id: 'review-5',
    type: 'review',
    title: 'Blending Cultures & Families Beautifully',
    subtitle: 'Sarah & Kabir (Temple Courtyard)',
    location: 'Bengaluru Temple',
    rating: 5,
    excerpt: 'They didn’t just coordinate vendors; they listened to our family history. They managed to blend Kabir’s traditional South Indian rituals with my family’s Western preferences seamlessly. Truly a masterclass in custom styling and multi-day project execution.',
    author: 'Sarah & Kabir'
  }
]

export default function BlogPage() {
  const [filter, setFilter] = useState<'all' | 'wedding' | 'guide' | 'review'>('all')

  const filteredItems = journalItems.filter(
    (item) => filter === 'all' || item.type === filter
  )

  const StarRating = () => (
    <div className="flex gap-1 text-accent mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="size-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
    </div>
  )

  return (
    <main className="bg-background">
      <PageHero
        eyebrow="The Journal & Reviews"
        title="Stories of love & client reviews"
        description="Browse through the journals of real weddings styled by Flora, read detailed planning tips, and explore the love letters and reviews sent by our couples."
        image="/images/gallery-celebration.png"
        imageAlt="Sparklers lit during wedding celebration"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          
          {/* Navigation Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-8">
            {(['all', 'wedding', 'guide', 'review'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cat === 'all'
                  ? 'All Logs'
                  : cat === 'wedding'
                  ? 'Real Weddings'
                  : cat === 'guide'
                  ? 'Planning Guides'
                  : 'Love Letters & Reviews'}
              </button>
            ))}
          </div>

          {/* Grid Layout containing dynamic items */}
          <motion.div 
            layout
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isReview = item.type === 'review'
                const isGuide = item.type === 'guide'
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    key={item.id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm h-full justify-between transition-all duration-300 hover:shadow-md ${
                      isReview ? 'border-accent/40 bg-secondary/15 p-6' : 'border-border'
                    }`}
                  >
                    <div>
                      {/* Image header if not a review card */}
                      {!isReview && item.image && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                            loading="lazy"
                          />
                          <span className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[9px] uppercase tracking-wider font-semibold shadow-sm backdrop-blur-md ${
                            isGuide ? 'bg-primary/80 text-primary-foreground' : 'bg-background/80 text-foreground'
                          }`}>
                            {isGuide ? 'Planning Guide' : 'Real Wedding'}
                          </span>
                        </div>
                      )}

                      {/* Header details */}
                      <div className={!isReview ? 'p-6 pb-2' : ''}>
                        {isReview ? (
                          <div className="flex items-center justify-between mb-4">
                            <StarRating />
                            <Quote className="size-8 text-accent/30 stroke-[1.5]" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-sans">
                            {item.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3.5" />
                                {item.date}
                              </span>
                            )}
                            {item.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3.5" />
                                {item.location}
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="font-serif text-xl font-medium text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="mt-1.5 text-xs font-sans uppercase tracking-wider text-muted-foreground/80">
                          {item.subtitle}
                        </p>

                        <p className={`mt-4 text-sm leading-relaxed text-muted-foreground text-pretty ${
                          isReview ? 'italic text-foreground/80' : ''
                        }`}>
                          {isReview ? `“${item.excerpt}”` : item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer / Author section */}
                    <div className={!isReview ? 'p-6 pt-4 border-t border-border/40 mt-4' : 'mt-6 border-t border-accent/20 pt-4'}>
                      <div className="flex items-center justify-between">
                        {isReview ? (
                          <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-foreground">
                              {item.author}
                            </p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="size-3" />
                              {item.location}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs uppercase tracking-widest font-semibold text-primary group-hover:underline flex items-center gap-1">
                            {isGuide ? <BookOpen className="size-3.5" /> : <MessageSquare className="size-3.5" />}
                            {isGuide ? 'Read Playbook' : 'Read Love Story'}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Submit Review Card Banner */}
          <FadeIn className="mt-24 rounded-2xl bg-secondary/35 border border-border/80 p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-48 h-48 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <Sparkles className="size-7 text-accent mb-4" />
              <h3 className="font-serif text-2xl font-medium md:text-3xl text-foreground">
                Were we part of your celebration?
              </h3>
              <p className="mt-3 text-sm max-w-lg leading-relaxed text-muted-foreground">
                We would love to read your feedback and compile your wedding stories in our archives. 
                Submit your review or get in touch with our design team.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Write Your Review
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-border bg-card px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-muted-foreground transition-colors hover:bg-secondary/40"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </main>
  )
}
