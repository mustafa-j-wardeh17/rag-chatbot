import { MessageSquare, BookOpen, Settings, Sparkles, LucideIcon, DollarSign, Mail, Upload } from 'lucide-react'

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
    id:'upload',
    label:'Upload',
    icon:Upload,
    href:'/upload'
  },
  // { 
  //   id: 'chat', 
  //   label: 'Chat', 
  //   icon: MessageSquare, 
  //   href: '/chat' 
  // },
  // { 
  //   id: 'pricing', 
  //   label: 'Pricing', 
  //   icon: DollarSign, 
  //   href: '/pricing' 
  // },
  { 
    id: 'contact', 
    label: 'Contact', 
    icon: Mail, 
    href: '/contact' 
  },
]

