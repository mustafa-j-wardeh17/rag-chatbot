import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navbar from "@/components/shared/navbar";
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
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
