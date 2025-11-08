"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Mail, CheckCircle } from "lucide-react"

export default function EmailSubscriptionRedesign() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  // Retained original subscription logic
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const supabase = createClient()
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }])

      if (error) {
        if (error.code === "23505") {
          setMessage("You're already part of our community!")
          setMessageType("success")
        } else {
          setMessage("Something went wrong. Please try again.")
          setMessageType("error")
        }
      } else {
        setMessage("Welcome to the community! Check your email.")
        setMessageType("success")
        setEmail("")
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="subscribe" // Using '#subscribe' to match previous button links
      className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 bg-muted/20" // Simpler, lighter background
    >
      <div className="max-w-4xl mx-auto">
        {/* Decorative Container with a subtle shadow for elevation */}
        <div className="relative bg-card rounded-2xl p-10 md:p-16 shadow-2xl shadow-primary/10 border border-border/70">

          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Header: Uses serif font for elegant, editorial style */}
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-snug max-w-2xl">
              Nourish Your Inbox
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              **The Weekly Whisk:** Get exclusive recipes, curated kitchen insights, and mindful living practices delivered to your inbox every week.
            </p>

            <form onSubmit={handleSubscribe} className="w-full max-w-lg space-y-5 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your mindful email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all duration-300" // Subtler border/ring focus
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 whitespace-nowrap shadow-md"
                >
                  <Mail size={20} />
                  {loading ? "Subscribing..." : "Join The Whisk"}
                </button>
              </div>

              {message && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 text-left ${
                    messageType === "success"
                      ? "bg-green-50 border border-green-300 text-green-800"
                      : "bg-red-50 border border-red-300 text-red-800"
                  }`}
                >
                  {messageType === "success" ? <CheckCircle size={20} className="flex-shrink-0 mt-0.5" /> : <Mail size={20} className="flex-shrink-0 mt-0.5" />}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              )}
            </form>

            <p className="text-sm text-muted-foreground tracking-wide pt-4">
              We promise to respect your inbox. No spam, only mindful content.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
