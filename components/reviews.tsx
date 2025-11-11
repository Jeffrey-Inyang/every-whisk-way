"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, Heart } from "lucide-react"
import Image from "next/image"

interface Review {
  id: string
  author_name: string
  content: string
  rating: number
  profile_image_url: string | null
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentReview, setCurrentReview] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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

  const changeReview = (newIndex: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentReview(newIndex)
      setIsAnimating(false)
    }, 300)
  }

  const goNext = () => changeReview((currentReview + 1) % reviews.length)
  const goPrev = () => changeReview((currentReview - 1 + reviews.length) % reviews.length)

  return (
    <section className="relative py-20 md:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Decorative Quote Marks */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote size={120} className="text-primary" strokeWidth={1} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 rotate-180">
        <Quote size={120} className="text-primary" strokeWidth={1} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Community Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.1] tracking-tight mb-4">
            Voices of Our Community
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Hear from those who've embraced mindful cooking and sustainable living in their daily lives.
          </p>
        </div>

        {/* Main Review Carousel */}
        <div className="relative">
          {/* Review Card */}
          <div className={`bg-card rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-border/50 transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Decorative Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote size={32} className="text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-8">
              {/* Quote Text */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif font-light text-foreground text-center leading-relaxed italic">
                "{review.content}"
              </blockquote>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-border" />
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="w-16 h-px bg-border" />
              </div>

              {/* Author Section */}
              <div className="flex flex-col items-center space-y-4">
                {/* Profile Image or Placeholder */}
                {review.profile_image_url ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={review.profile_image_url}
                      alt={review.author_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/20">
                    <span className="text-2xl font-serif font-light text-primary">
                      {review.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Author Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium text-foreground tracking-wide">
                    {review.author_name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Verified Community Member
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={`${
                        i < review.rating 
                          ? "fill-primary text-primary" 
                          : "fill-none text-border"
                      } transition-colors`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-center gap-8">
            {/* Previous Button */}
            <button
              onClick={goPrev}
              disabled={isAnimating}
              className="group w-12 h-12 rounded-full bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous review"
            >
              <ChevronLeft 
                size={24} 
                className="text-muted-foreground group-hover:text-primary group-hover:-translate-x-0.5 transition-all" 
              />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAnimating && changeReview(index)}
                  disabled={isAnimating}
                  className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                    index === currentReview 
                      ? "w-8 h-2 bg-primary" 
                      : "w-2 h-2 bg-border hover:bg-primary/40"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goNext}
              disabled={isAnimating}
              className="group w-12 h-12 rounded-full bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next review"
            >
              <ChevronRight 
                size={24} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" 
              />
            </button>
          </div>

          {/* Review Counter */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-light tracking-[0.1em]">
              <span className="text-foreground font-medium">{currentReview + 1}</span>
              {" "} of {" "}
              <span className="text-foreground font-medium">{reviews.length}</span>
              {" "} reviews
            </p>
          </div>
        </div>

        {/* Optional: Additional Trust Elements */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-serif font-light text-foreground">4.9/5</h3>
              <p className="text-sm text-muted-foreground font-light">Average Rating</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary fill-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-serif font-light text-foreground">{reviews.length}+</h3>
              <p className="text-sm text-muted-foreground font-light">Community Reviews</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-serif font-light text-foreground">1,000+</h3>
              <p className="text-sm text-muted-foreground font-light">Active Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}