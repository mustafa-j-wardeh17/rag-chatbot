
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { Sparkles, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

interface ChatLineProps extends Partial<Message> {
  sources: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources,
}: ChatLineProps) {
  const t = useTranslations('chat');
  if (!content) {
    return null;
  }

  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
        !isAssistant && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={cn(
            "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200",
            isAssistant
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : "bg-gradient-to-br from-amber-500 to-orange-600"
          )}
        >
          {isAssistant ? (
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          ) : (
            <User className="w-5 h-5 text-white" strokeWidth={2.5} />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex-1 min-w-0 space-y-2",
          !isAssistant && "flex flex-col items-end"
        )}
      >
        {/* Name Badge */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              isAssistant
                ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20"
                : "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20"
            )}
          >
            {isAssistant ? t('labels.assistant') : t('labels.you')}
          </span>
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-2xl shadow-lg transition-all duration-200",
            "border backdrop-blur-sm",
            isAssistant
              ? "bg-card/80 dark:bg-muted/30 text-card-foreground dark:text-foreground rounded-tl-sm border-border/50 dark:border-border/60"
              : "bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 text-foreground rounded-tr-sm border-amber-500/20 dark:border-amber-500/30",
            "hover:shadow-xl dark:hover:shadow-2xl"
          )}
        >
          {/* Content */}
          <div className="p-5">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="text-[15px] leading-relaxed text-foreground/90 dark:text-foreground/95">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-3 space-y-1 ml-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-3 space-y-1 ml-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-foreground/80 dark:text-foreground/90">{children}</li>
                    ),
                    code: ({ children }) => (
                      <code className="px-1.5 py-0.5 rounded-md bg-muted dark:bg-muted/60 text-sm font-mono text-foreground dark:text-foreground">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="p-3 rounded-lg bg-muted dark:bg-muted/60 overflow-x-auto mb-3 text-foreground dark:text-foreground">
                        {children}
                      </pre>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sources */}
          {sources && sources.length > 0 && (
            <div className="border-t border-border/50 dark:border-border/60 bg-muted/30 dark:bg-muted/40 rounded-b-2xl">
              <Accordion
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value="sources" className="border-0">
                  <AccordionTrigger className="px-5 py-3 text-xs font-medium text-muted-foreground dark:text-muted-foreground/80 hover:text-foreground dark:hover:text-foreground transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{sources.length} Source{sources.length > 1 ? "s" : ""}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-0">
                    <div className="space-y-3">
                      {sources.map((source, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg bg-background/50 dark:bg-background/70 border border-border/50 dark:border-border/60 text-xs"
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <FileText className="w-3.5 h-3.5 text-muted-foreground dark:text-muted-foreground/80 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold text-muted-foreground dark:text-muted-foreground/80">
                              Source {index + 1}
                            </span>
                          </div>
                          <div className="mt-2 text-foreground/70 dark:text-foreground/80 leading-relaxed">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                ),
                                a: ({ node, ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                  />
                                ),
                              }}
                            >
                              {formattedText(source)}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton component for loading state
export function ChatLineSkeleton() {
  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Avatar Skeleton */}
      <div className="flex-shrink-0">
        <Skeleton className="w-10 h-10 rounded-2xl" />
      </div>

      {/* Message Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name Badge Skeleton */}
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        {/* Message Bubble Skeleton */}
        <div className="relative rounded-2xl shadow-lg border border-border/50 dark:border-border/60 bg-card/80 dark:bg-muted/30 rounded-tl-sm">
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
