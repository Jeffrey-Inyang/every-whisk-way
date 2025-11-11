"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Mail, CheckCircle, Sparkles, ArrowRight, Gift, BookOpen, Clock } from "lucide-react"

export default function EmailSubscription() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

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
        setMessage("Welcome to the community! Check your email for confirmation.")
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
      id="subscribe"
      className="relative py-20 md:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                Free Weekly Newsletter
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.05] tracking-tight">
                Nourish Your Inbox with{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">The Weekly Whisk</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -rotate-1 blur-sm" />
                </span>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Join our community of mindful cooks and get exclusive recipes, kitchen wisdom, and sustainable living practices delivered to your inbox every Sunday morning.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 pt-4">
              {[
                { icon: BookOpen, text: "Weekly curated recipes & cooking guides" },
                { icon: Sparkles, text: "Exclusive tips for sustainable living" },
                { icon: Clock, text: "Early access to new content & products" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-base text-foreground font-light pt-2">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Join <span className="text-foreground font-medium">1,000+</span> subscribers
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:pl-8">
            <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-2xl border border-border/50 backdrop-blur-sm">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-light text-foreground mb-2">
                  Start Your Journey
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  Subscribe now and get our free Kitchen Essentials Guide
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="space-y-5">
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-4 pr-12 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-light text-base hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Join The Community</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Message Display */}
                {message && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 ${
                      messageType === "success"
                        ? "bg-green-50 border-2 border-green-200 text-green-800"
                        : "bg-red-50 border-2 border-red-200 text-red-800"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <Mail size={20} className="flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-light leading-relaxed">{message}</p>
                  </div>
                )}
              </form>

              {/* Privacy Notice */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-xs text-center text-muted-foreground font-light leading-relaxed">
                  We respect your privacy. Unsubscribe at any time. No spam, only mindful content. 
                  By subscribing, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* Social Proof Below Form */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="font-light">4.9/5 rating</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="font-light">Trusted by 1,000+ readers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}