import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Contrast - Free WCAG Color Contrast Checker",
  description: "Ensure your website meets WCAG 2.1 accessibility standards with our free, real-time color contrast checker. Test color combinations for better web accessibility.",
  keywords: ["color contrast checker", "WCAG 2.1", "accessibility tool", "web accessibility", "color contrast ratio", "a11y", "color accessibility", "design tool"],
  authors: [{ name: "Bowei Tombri" }],
  creator: "Bowei Tombri",
  publisher: "Tiny Contrast",
  metadataBase: new URL('https://tiny-contrast.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tiny Contrast - Free WCAG Color Contrast Checker",
    description: "Test color combinations for WCAG 2.1 compliance with our free, real-time color contrast checker.",
    url: 'https://tiny-contrast.vercel.app',
    siteName: 'Tiny Contrast',
    images: [
      {
        url: '/og-image.png', // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Tiny Contrast - Color Accessibility Checker',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiny Contrast - Free WCAG Color Contrast Checker',
    description: 'Test color combinations for WCAG 2.1 compliance with our free, real-time color contrast checker.',
    creator: '@yourtwitter',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* This link is the "engine" that turns text into icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}