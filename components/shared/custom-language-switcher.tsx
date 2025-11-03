"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Languages, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

export default function CustomLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRTL = locale === 'ar';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative flex-shrink-0 w-9 h-9" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 cursor-pointer rounded-lg border border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/40 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 group relative overflow-hidden flex items-center justify-center"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="h-4 w-4 text-foreground" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 w-36 rounded-lg bg-background/95 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/5 z-[100] overflow-hidden",
            isRTL ? "left-0" : "right-0"
          )}
          style={{
            position: 'absolute',
            isolation: 'isolate',
          }}
        >
          <div className="flex flex-col gap-1 p-1">
            {languages.map((lang) => {
              const isActive = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 text-left cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <span className="flex-1">{lang.label}</span>
                  {isActive && (
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

