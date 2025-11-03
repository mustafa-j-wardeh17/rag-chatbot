"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { navigationItems } from '@/constants/navigation'
import { Sparkles } from 'lucide-react'
import CustomLanguageSwitcher from './custom-language-switcher'
import CustomThemeToggle from './custom-theme-toggle'

const Navbar = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('navbar')
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0, isAnimating: false })
  const navItemsRef = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Sync active nav with current pathname - this is the source of truth
  useEffect(() => {
    // usePathname from next-intl already returns pathname without locale
    const currentPath = pathname || '/'
    
    // Match exact pathname or handle root path
    const currentItem = navigationItems.find(item => {
      if (item.href === '/') {
        // Only match root if pathname is exactly '/'
        return currentPath === '/'
      }
      // Match exact path or sub-paths
      return currentPath === item.href || currentPath.startsWith(item.href + '/')
    })
    
    if (currentItem) {
      setActiveNav(currentItem.id)
    } else {
      // Fallback to home if no match found
      setActiveNav('home')
    }
  }, [pathname, locale])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate slider position
  const updateSliderPosition = useCallback(() => {
    const activeElement = navItemsRef.current[activeNav]
    
    if (activeElement) {
      const container = activeElement.parentElement
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()
        
        // Calculate position - works correctly in both LTR and RTL
        // getBoundingClientRect returns absolute positions, so we calculate relative to container
        const leftPosition = activeRect.left - containerRect.left
        
        setSliderStyle(prev => ({
          ...prev,
          width: activeRect.width,
          left: leftPosition,
          isAnimating: true,
        }))

        // Reset animation flag after animation completes
        setTimeout(() => {
          setSliderStyle(prev => ({ ...prev, isAnimating: false }))
        }, 700)
      }
    }
  }, [activeNav, locale])

  // Update slider position when active nav or locale changes
  useEffect(() => {
    // Delay to ensure DOM is updated after navigation/layout changes
    const timer = setTimeout(() => {
      updateSliderPosition()
    }, 150)
    return () => clearTimeout(timer)
  }, [activeNav, locale, updateSliderPosition])

  // Initial position calculation and resize handler
  useEffect(() => {
    // Initial calculation with slight delay for render
    const timer = setTimeout(updateSliderPosition, 100)
    window.addEventListener('resize', updateSliderPosition)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateSliderPosition)
    }
  }, [updateSliderPosition, locale])

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={cn(
          "w-full max-w-5xl transition-all duration-500 pointer-events-auto",
          "backdrop-blur-xl border rounded-3xl ring-1 ring-primary/5 relative",
        // Base shadows for light mode - subtle and professional
        "shadow-[0_8px_16px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)]",
        "shadow-primary/5",
        // Dark mode shadows - more prominent with better contrast
        "dark:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5),0_4px_8px_-2px_rgba(0,0,0,0.3)]",
        "dark:shadow-primary/30",
        // Scrolled state - enhanced shadows
        scrolled 
          ? "bg-background/90 border-primary/20 rounded-2xl shadow-[0_20px_32px_-8px_rgba(0,0,0,0.12),0_8px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_32px_-8px_rgba(0,0,0,0.6),0_8px_16px_-4px_rgba(0,0,0,0.4)]" 
          : "bg-background/70 border-primary/10 rounded-3xl",
        // Inner highlight for glassmorphism
        "before:absolute before:inset-0 before:rounded-inherit before:pointer-events-none before:z-0"
      )}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 opacity-50 -z-10 blur-xl" />
      
      <div className={cn(
        "flex items-center justify-between px-6 py-4 relative",
        "min-h-[72px]"
      )}>
        {/* Logo Section */}
        <Link 
          href="/" 
          className="sm:flex hidden items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            {/* Icon container with gradient */}
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/30">
              <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
            </div>
          </div>
          <div className="sm:flex flex-col  hidden">
            <span className="text-lg font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
              {t('title')}
            </span>
            <span className="text-[10px] text-muted-foreground leading-none -mt-0.5 font-medium opacity-80">
              {t('subtitle')}
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-1 px-2.5 py-2 rounded-2xl bg-gradient-to-br from-muted/40 via-muted/30 to-muted/40 backdrop-blur-md border border-primary/10 shadow-inner relative overflow-hidden">
          {/* Sliding background indicator */}
          <div
            className={cn(
              "absolute top-2.5 bottom-2.5 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-primary shadow-lg shadow-primary/30 pointer-events-none z-0",
              sliderStyle.isAnimating ? "transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" : "transition-none"
            )}
            style={{
              width: `${sliderStyle.width}px`,
              left: `${sliderStyle.left}px`,
              opacity: sliderStyle.width > 0 ? 1 : 0,
              transform: 'translateZ(0)', // Hardware acceleration
            }}
          >
            {/* Glow effects for slider */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-xl blur-md" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
          </div>
          
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  navItemsRef.current[item.id] = el
                }}
                href={item.href as any}
                onClick={(e) => {
                  // Update active nav immediately for better UX
                  setActiveNav(item.id)
                  // Let Next.js handle navigation, then update slider after navigation
                  setTimeout(() => {
                    updateSliderPosition()
                  }, 100)
                }}
                className={cn(
                  "relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-colors duration-300 z-20 isolate group cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  locale === 'ar' && "flex-row-reverse",
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Individual hover background - isolated to this item only */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-primary/5 transition-opacity duration-300 pointer-events-none" />
                )}
                
                {/* Individual hover shimmer effect - isolated */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                )}
                
                <Icon 
                  className={cn(
                    "h-4 w-4 transition-transform duration-300 relative z-10",
                    isActive && "scale-110 drop-shadow-sm",
                    !isActive && "group-hover:scale-110"
                  )} 
                />
                <span className={cn(
                  "text-sm font-semibold relative z-10 transition-all",
                  isActive && "drop-shadow-sm"
                )}>
                  {t(item.id.toLowerCase() as any)}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Mobile Navigation - Simplified */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-gradient-to-br from-muted/40 to-muted/30 backdrop-blur-md border border-primary/10">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href as any}
                  className={cn(
                    "p-2.5 rounded-lg transition-all duration-300 relative isolate cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20 rounded-lg blur-sm" />
                  )}
                  <Icon className={cn("h-4 w-4 relative z-10", isActive && "scale-110")} />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Language Switcher & Theme Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="h-8 w-px bg-border/50 flex-shrink-0" />
          
          {/* Custom Locale Switcher */}
          <CustomLanguageSwitcher />

          {/* Custom Theme Toggle */}
          <CustomThemeToggle />
        </div>
      </div>

        {/* Decorative Gradient Lines */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
      </nav>
    </div>
  )
}

export default Navbar