"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, ChevronRight, ShoppingBag, ExternalLink, Sparkles, ArrowRight } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image_url: string | null
  product_link: string | null
}

export default function Merchandise() {
  const [products, setProducts] = useState<Product[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("merchandise").select("*").order("created_at", { ascending: false })
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("merch-scroll")
    if (!container) return
    const scrollAmount = 350
    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 50) 
  }
  
  useEffect(() => {
    if (products.length > 0) {
        const container = document.getElementById("merch-scroll");
        if (container) {
            setCanScrollRight(container.scrollWidth > container.clientWidth);
        }
    }
  }, [products]);

  return (
    <section className="relative py-20 md:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background to-muted/20 overflow-hidden" id="merchandise">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-border/50">
            <div className="space-y-6 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  The Collection
                </span>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.1] tracking-tight mb-4">
                  Curated Kitchen Essentials
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed">
                  Discover carefully selected products that embody quality, sustainability, and mindfulness in every whisk. 
                  Each item is chosen to elevate your conscious cooking journey.
                </p>
              </div>
            </div>

            {/* View All CTA */}
            <a 
              href="https://www.redbubble.com/shop/ap/175680480" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all group flex-shrink-0"
            >
              <span className="font-light">View Full Shop</span>
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Gradient Overlays for scroll indication */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden lg:block" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden lg:block" />
          )}

          <div 
            id="merch-scroll" 
            className="flex gap-8 overflow-x-auto pb-8 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            onScroll={handleScroll}
          >
            {products.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center py-24 min-w-full">
                <div className="w-20 h-20 mb-6 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-light text-foreground mb-3">Coming Soon</h3>
                <p className="text-base text-muted-foreground font-light">
                  Premium merchandise is being carefully curated. Check back soon.
                </p>
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <a 
                    key={product.id} 
                    href={product.product_link || `/merch/${product.id}`}
                    target={product.product_link ? "_blank" : undefined}
                    rel={product.product_link ? "noopener noreferrer" : undefined}
                    className="flex-shrink-0 w-80 snap-start group"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <article className="h-full bg-card rounded-2xl overflow-hidden transition-all duration-500 border border-border/50 group-hover:border-primary/40 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                        {product.image_url ? (
                          <>
                            <Image
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 90vw, 25vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Quick View Badge */}
                            <div className={`absolute top-4 right-4 transition-all duration-300 ${
                              hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                            }`}>
                              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2">
                                <ExternalLink className="w-3 h-3 text-primary" />
                                <span className="text-xs font-medium text-foreground">View</span>
                              </div>
                            </div>

                            {/* Product Link Indicator */}
                            {product.product_link && (
                              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-light">
                                  <ShoppingBag className="w-4 h-4" />
                                  <span>Shop Now</span>
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-3" />
                            <span className="text-sm text-muted-foreground">Product Image</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6 space-y-3">
                        <div className="space-y-2">
                          <h3 className="font-serif font-light text-xl text-foreground leading-tight transition-colors group-hover:text-primary line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-light text-primary">${product.price.toFixed(2)}</p>
                            {product.product_link && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" />
                                <span>External</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </a>
                ))}
                
                {/* End CTA Card */}
                <div className="flex-shrink-0 w-80 snap-start">
                  <a 
                    href="https://www.redbubble.com/shop/ap/175680480" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 border-2 border-dashed border-border/70 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group/cta"
                  >
                    <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/cta:bg-primary/20 transition-colors">
                      <ShoppingBag className="w-8 h-8 text-primary group-hover/cta:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-2xl font-serif font-light text-foreground mb-3 text-center">
                      Explore Full Collection
                    </h3>
                    <p className="text-sm text-muted-foreground text-center max-w-[200px] mb-6 leading-relaxed">
                      Discover all our mindful kitchen essentials and sustainable products.
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary group-hover/cta:gap-3 transition-all">
                      <span className="text-sm font-light">Visit Shop</span>
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>
          
          {/* Scroll Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all flex items-center justify-center z-20 shadow-lg hidden md:flex group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all flex items-center justify-center z-20 shadow-lg hidden md:flex group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center lg:hidden">
          <a 
            href="https://www.redbubble.com/shop/ap/175680480" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all"
          >
            <span className="font-light">View Full Collection</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}