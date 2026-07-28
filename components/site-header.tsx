'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FloraLogo } from '@/components/ui/flora-logo'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/venues', label: 'Venues' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Wedding Gallery' },
  { href: '/contact', label: 'Enquire' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isPortal = pathname === '/portal'
  const isTransparent = !scrolled && !isPortal && !open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent border-b border-transparent py-6'
          : 'bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 relative">
        <Link href="/" className="flex items-center gap-2.5 z-50">
          <FloraLogo size={32} className="rounded-full overflow-hidden" />
          <span className={cn(
            "font-serif text-lg tracking-[0.25em] font-medium uppercase transition-colors duration-300",
            isTransparent ? "text-white" : "text-foreground"
          )}>
            Flora
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-xs uppercase tracking-[0.25em] font-medium py-1 transition-all duration-300',
                isTransparent
                  ? pathname === link.href
                    ? 'text-white'
                    : 'text-white/75 hover:text-white'
                  : pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="activeHeaderLink"
                  className={cn(
                    'absolute bottom-0 left-0 h-0.5 w-full',
                    isTransparent ? 'bg-white' : 'bg-primary'
                  )}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={cn(
            'transition-colors md:hidden z-50',
            isTransparent ? 'text-white' : 'text-foreground'
          )}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-3 text-sm uppercase tracking-[0.2em]',
                    pathname === link.href
                      ? 'bg-secondary text-secondary-foreground font-medium'
                      : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
