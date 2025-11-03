"use client";

import { useState, useRef, useEffect } from 'react';
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export default function CustomThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="relative flex-shrink-0 w-9 h-9">
        <div className="h-9 w-9 rounded-lg border border-primary/20 bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
          <div className="h-4 w-4" />
        </div>
      </div>
    );
  }

  const currentTheme = theme || 'system';
  const CurrentIcon = themes.find(t => t.value === currentTheme)?.icon || Monitor;

  return (
    <div className="relative flex-shrink-0 w-9 h-9" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 cursor-pointer rounded-lg border border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/40 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 group relative overflow-hidden flex items-center justify-center"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        
        {/* Sun icon */}
        <Sun className={cn(
          "h-4 w-4 absolute transition-all duration-500",
          currentTheme === "dark" 
            ? "scale-0 rotate-90 opacity-0" 
            : currentTheme === "light"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 opacity-0"
        )} />
        
        {/* Moon icon */}
        <Moon className={cn(
          "h-4 w-4 absolute transition-all duration-500",
          currentTheme === "dark" 
            ? "scale-100 rotate-0 opacity-100" 
            : "scale-0 -rotate-90 opacity-0"
        )} />
        
        {/* System icon (fallback) */}
        <Monitor className={cn(
          "h-4 w-4 absolute transition-all duration-500",
          currentTheme === "system" 
            ? "scale-100 opacity-100" 
            : "scale-0 opacity-0"
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-36 rounded-lg bg-background/95 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/5 z-[100] overflow-hidden"
          style={{
            position: 'absolute',
            isolation: 'isolate',
          }}
        >
          <div className="flex flex-col gap-1 p-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = currentTheme === themeOption.value;
              return (
                <button
                  key={themeOption.value}
                  type="button"
                  onClick={() => handleThemeChange(themeOption.value)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 text-left cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{themeOption.label}</span>
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

