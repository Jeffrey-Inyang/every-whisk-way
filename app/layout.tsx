import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Define the Cloudinary URL for the logo/favicon
const FAVICON_URL = "https://res.cloudinary.com/dkccco1fh/image/upload/v1762828762/Gemini_Generated_Image_fppd05fppd05fppd_2_wusnaa.svg"

export const metadata: Metadata = {
  title: "Every Whisk Way - Mindful Cooking Blog",
  description: "Mindful kitchens, every whisk way. Explore our blog on cooking, recipes, and mindful eating.",
  icons: {
    // 🗑️ Replaced the existing icon array with the single Cloudinary SVG URL
    icon: [
      {
        url: FAVICON_URL,
        type: "image/svg+xml",
        // Setting sizes to 'any' is common for SVGs to indicate flexibility
        sizes: 'any', 
      },
    ],
    // 📌 You might want to remove 'apple' if you don't have a specific apple-icon.png 
    // that differs from the main SVG, but I left it here for continuity.
    apple: "/apple-icon.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Note: I've added back the font variables to the body className.
  return (
    <html lang="en">
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
