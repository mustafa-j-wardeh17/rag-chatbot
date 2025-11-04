import { Chat } from '@/components/shared/chat/chat'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen pt-44 pb-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <Chat />
      </div>
    </main>
  )
}

export default page