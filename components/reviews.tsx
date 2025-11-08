"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react" // Added Quote icon
import Image from "next/image"

interface Review {
  id: string
  author_name: string
  content: string
  rating: number
  profile_image_url: string | null
}

export default function ReviewsRedesign() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentReview, setCurrentReview] = useState(0)

  // Retained data fetching logic
  useEffect(() => {
    const fetchReviews = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })
      if (data) setReviews(data)
    }
    fetchReviews()
  }, [])

  if (reviews.length === 0) return null

  const review = reviews[currentReview]

  const goNext = () => setCurrentReview((prev) => (prev + 1) % reviews.length)
  const goPrev = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <span className="text-sm font-serif font-semibold text-primary tracking-wider">Community Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-serif text-foreground leading-tight">
            Nourished Voices
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Main Review Card */}
          <div className="bg-card rounded-2xl p-8 md:p-16 shadow-xl border border-border/70 transition-all duration-500 ease-in-out">
            
            {/* Quote Icon */}
            <div className="text-center mb-6">
                <Quote size={48} className="text-primary/20 mx-auto" strokeWidth={1} />
            </div>

            {/* Review Text - Largest and most prominent element, using serif font and heavier weight */}
            <p className="text-2xl md:text-3xl font-serif text-foreground text-center mb-10 leading-snug">
              **"{review.content}"**
            </p>

            {/* Author and Rating */}
            <div className="flex flex-col items-center">
                {/* Rating */}
                <div className="flex justify-center gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-secondary text-secondary" />
                    ))}
                </div>

                {/* Author Name - Subtler than the quote */}
                <h3 className="font-semibold text-foreground text-lg tracking-wide border-t border-border/50 pt-3 mt-3">
                    — {review.author_name}
                </h3>
                
                {/* Optional: Placeholder for Author Detail */}
                <p className="text-sm text-muted-foreground mt-1">
                    Verified Community Member
                </p>
            </div>
            
          </div>
          
          {/* Navigation Controls - Moved outside the card but adjacent to it */}
          <div className="flex justify-between items-center mt-8 px-4">
            
            {/* Previous Button */}
            <button
              onClick={goPrev}
              className="p-3 w-12 h-12 bg-background border border-border rounded-full shadow-lg hover:bg-primary/10 transition text-primary hover:text-primary/80"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReview ? "bg-primary w-6" : "bg-border hover:bg-primary/40"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={goNext}
              className="p-3 w-12 h-12 bg-background border border-border rounded-full shadow-lg hover:bg-primary/10 transition text-primary hover:text-primary/80"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Review Count (Optional, kept for utility) */}
          <p className="text-center text-muted-foreground text-sm mt-8 tracking-wider">
            {currentReview + 1} OF {reviews.length}
          </p>

        </div>
      </div>
    </section>
  )
}
