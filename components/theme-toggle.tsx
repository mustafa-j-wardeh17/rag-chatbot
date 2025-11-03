"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-primary/20 bg-gradient-to-br from-background to-muted/30">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 cursor-pointer rounded-lg border-primary/20 bg-gradient-to-br from-background to-muted/30 hover:border-primary/40 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Sun icon */}
          <Sun className={cn(
            "h-4 w-4 absolute transition-all duration-500",
            theme === "dark" 
              ? "scale-0 rotate-90 opacity-0" 
              : "scale-100 rotate-0 opacity-100"
          )} />
          
          {/* Moon icon */}
          <Moon className={cn(
            "h-4 w-4 absolute transition-all duration-500",
            theme === "dark" 
              ? "scale-100 rotate-0 opacity-100" 
              : "scale-0 -rotate-90 opacity-0"
          )} />
          
          {/* System icon (fallback) */}
          <Monitor className={cn(
            "h-4 w-4 absolute transition-all duration-500",
            theme === "system" 
              ? "scale-100 opacity-100" 
              : "scale-0 opacity-0"
          )} />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        sideOffset={8}
        className="w-36 bg-background/95 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/5 flex flex-col gap-1"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-all",
            theme === "light" && "bg-primary/10 text-primary font-semibold"
          )}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-all",
            theme === "dark" && "bg-primary/10 text-primary font-semibold"
          )}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-all",
            theme === "system" && "bg-primary/10 text-primary font-semibold"
          )}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
