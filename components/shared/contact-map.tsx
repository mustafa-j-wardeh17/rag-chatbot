"use client";

import { motion } from 'framer-motion';
import { MapPin, Navigation2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export default function ContactMap({ latitude, longitude, className = "" }: ContactMapProps) {
  const t = useTranslations('contact.map');
  // Use Google Maps with default marker - professional design
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-br from-background to-muted/20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />
      
      {/* Map Container with Professional Styling */}
      <div className="relative w-full h-[450px] md:h-[550px] bg-muted/30">
        {/* Google Maps Embed */}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
        
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5 pointer-events-none z-0" />
        
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none z-0" />
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none z-0" />
      </div>

      {/* Professional Map Info Card */}
      <motion.div
        className="absolute top-6   md:left-6 md:w-auto z-20"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <div className="bg-background/98 backdrop-blur-xl border border-primary/20 rounded-xl p-5 shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-4">
            {/* Icon with gradient background */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl blur-md opacity-50" />
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl shadow-lg shadow-primary/30">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            
            {/* Location Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                <Navigation2 className="w-4 h-4 text-primary" />
                {t('location')}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  {t('getDirections')}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />
    </motion.div>
  );
}
