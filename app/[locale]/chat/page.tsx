"use client";

import { Chat } from '@/components/shared/chat/chat'
import { useLocale } from 'next-intl'
import React from 'react'

const page = () => {
  const locale = useLocale()
  
  return (
    <main className="min-h-screen pt-44 pb-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <Chat locale={locale} />
      </div>
    </main>
  )
}

export default page