import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "../api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "RAG Chatbot - AI-Powered Document Assistant",
    description: "Retrieval-Augmented Generation chatbot for intelligent document assistance",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
            >
                <Script
                    id="scrollbar-fix"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function calculateScrollbarWidth() {
                                    if (typeof document === 'undefined') return;
                                    
                                    const outer = document.createElement('div');
                                    outer.style.cssText = 'visibility: hidden; overflow: scroll; position: absolute; width: 100px; height: 100px; top: -9999px;';
                                    document.body.appendChild(outer);

                                    const inner = document.createElement('div');
                                    inner.style.width = '100%';
                                    inner.style.height = '100%';
                                    outer.appendChild(inner);

                                    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
                                    document.body.removeChild(outer);

                                    if (scrollbarWidth > 0) {
                                        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
                                    }
                                    return scrollbarWidth;
                                }

                                if (document.readyState === 'loading') {
                                    document.addEventListener('DOMContentLoaded', calculateScrollbarWidth);
                                } else {
                                    calculateScrollbarWidth();
                                }
                                
                                window.addEventListener('resize', calculateScrollbarWidth);
                            })();
                        `,
                    }}
                />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                            }}
                        />
                        <NextSSRPlugin
                            /**
                             * The `extractRouterConfig` will extract **only** the route configs
                             * from the router to prevent additional information from being
                             * leaked to the client. The data passed to the client is the same
                             * as if you were to fetch `/api/uploadthing` directly.
                             */
                            routerConfig={extractRouterConfig(ourFileRouter)}
                        />
                        <div className="flex flex-col min-h-screen">
                            {children}
                            <Footer />
                        </div>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
