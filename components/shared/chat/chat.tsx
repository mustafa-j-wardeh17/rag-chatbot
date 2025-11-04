"use client";

import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
import { ChatLine, ChatLineSkeleton } from "./chat-line";
import { useChat, Message } from "ai/react";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Send, Sparkles } from "lucide-react";

interface Data {
  sources: string[];
}

export function Chat() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages,
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef as React.RefObject<HTMLElement>), 100);
  }, [messages]);

  const isEmpty = messages.length <= 1;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Chat Container */}
      <div 
        className={`
          relative overflow-hidden
          rounded-3xl border border-border/50
          bg-gradient-to-br from-background via-background to-muted/20
          shadow-2xl shadow-black/5 dark:shadow-black/20
          backdrop-blur-sm
          p-y-6
          transition-all duration-300
          ${isEmpty ? 'h-[calc(100vh-400px)] min-h-[600px]' : 'h-[calc(100vh-380px)] min-h-[500px]'}
        `}
      >
        {/* Header Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background via-background/95 to-transparent z-10 pointer-events-none" />
        
        {/* Messages Area */}
        <div 
          className={`
            h-full overflow-y-auto overflow-x-hidden
            scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent
            ${isEmpty ? 'pt-44' : 'pt-8'}
            px-6 pb-8
            transition-all duration-500 ease-out
          `}
          ref={containerRef}
        >
          {/* Empty State */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl">
                  <Sparkles className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Welcome to AI Assistant
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ask me anything about your documents. I'm here to help you find answers quickly and accurately.
                </p>
              </div>
            </div>
          )}

          {/* Messages List */}
          <div className="space-y-6 my-1 max-w-4xl mx-auto">
            {messages.map(({ id, role, content }: Message, index) => (
              <ChatLine
                key={id}
                role={role}
                content={content}
                sources={data?.length ? getSources(data as unknown as Data[], role, index) : []}
              />
            ))}
            
            {/* Loading Skeleton */}
            {isLoading && (
              <ChatLineSkeleton />
            )}
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/95 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Input Area */}
      <div className="relative">
        <form 
          onSubmit={handleSubmit} 
          className="relative w-full"
        >
          <div className="relative group">
            {/* Input Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            
            {/* Input with centered send button */}
            <div className="relative flex items-center h-14 bg">
              <input
                value={input}
                placeholder="Ask a question about your documents..."
                onChange={handleInputChange}
                disabled={isLoading}
                className={`
                  relative w-full
                  h-14 px-6 pr-[72px]
                  text-base
                  rounded-2xl border-none outline-none
                  bg-background/95 
                  transition-all duration-200
                  placeholder:text-muted-foreground/60
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg shadow-black/5 dark:shadow-black/20
                `}
              />
              
              {/* Send Button - Centered at end */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className={`
                    h-10 w-10 rounded-xl 
                    bg-gradient-to-r from-blue-500 to-purple-600
                    hover:from-blue-600 hover:to-purple-700
                    text-white
                    shadow-lg shadow-blue-500/25
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                  `}
                >
                  {isLoading ? (
                    <Spinner className="w-4 h-4 text-white" />
                  ) : (
                    <Send className="w-4 h-4" strokeWidth={2.5} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
        
        {/* Footer hint */}
        <p className="text-xs text-muted-foreground/60 text-center mt-4">
          Powered by advanced AI • Your conversations are private and secure
        </p>
      </div>
    </div>
  );
}
