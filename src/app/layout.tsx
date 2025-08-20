import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@mdxeditor/editor/style.css"
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Jobs by Bob",
  description: "AI job board website created by Bobby DeLucia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans dark`}
      >
        <ClerkProvider>
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  )
}
