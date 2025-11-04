import { MessageSquare, BookOpen, Settings, Sparkles, LucideIcon, DollarSign, Mail, Upload, Info } from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
}

export const navigationItems: NavigationItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Sparkles, 
    href: '/' 
  },
  {
    id: 'about',
    label: 'About',
    icon: Info,
    href: '/about'
  },
  {
    id:'upload',
    label:'Upload',
    icon:Upload,
    href:'/upload'
  },
  { 
    id: 'chat', 
    label: 'Chat', 
    icon: MessageSquare, 
    href: '/chat' 
  },
  { 
    id: 'contact', 
    label: 'Contact', 
    icon: Mail, 
    href: '/contact' 
  },
]

