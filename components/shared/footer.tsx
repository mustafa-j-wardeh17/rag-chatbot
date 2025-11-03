"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Sparkles, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navbar');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/upload', label: tNav('upload') },
    { href: '/contact', label: tNav('contact') },
  ];

  const resources = [
    { href: '/about', label: t('resources.documentation') },
    { href: '/contact', label: t('resources.support') },
    { href: '/pricing', label: tNav('pricing') },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: t('social.github') },
    { icon: Twitter, href: '#', label: t('social.twitter') },
    { icon: Linkedin, href: '#', label: t('social.linkedin') },
    { icon: Mail, href: '#', label: t('social.email') },
  ];

  return (
    <footer className="relative border-t border-primary/10 bg-gradient-to-b from-background to-muted/20">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/30">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {tNav('title')}
                </span>
                <span className="text-xs text-muted-foreground leading-none -mt-0.5">
                  {tNav('subtitle')}
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('resources.title')}
            </h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    href={resource.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-200" />
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t('connect')}
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-primary/10 flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn(
          "mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4",
          isRTL && "md:flex-row-reverse"
        )}>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} {tNav('title')}. {t('copyright')}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t('madeWith')}</span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span>{t('by')}</span>
            <span className="text-primary font-semibold">Mustafa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

