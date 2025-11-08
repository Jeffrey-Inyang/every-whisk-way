"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react" // Added ShoppingBag for a cleaner CTA

interface Product {
  id: string
  name: string
  price: number
  image_url: string | null
  product_link: string | null
}

export default function MerchandiseRedesignStyled() {
  const [products, setProducts] = useState<Product[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Retained original data fetching logic
  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("merchandise").select("*").order("created_at", { ascending: false })
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  // Retained original scroll functionality
  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("merch-scroll")
    if (!container) return
    const scrollAmount = 300
    const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setCanScrollLeft(container.scrollLeft > 0)
    // Adjusted threshold for better visibility/UX on scroll check
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 50) 
  }
  
  // Set initial scroll state after products load
  useEffect(() => {
    if (products.length > 0) {
        // Run initial check to see if scroll is possible
        const container = document.getElementById("merch-scroll");
        if (container) {
            setCanScrollRight(container.scrollWidth > container.clientWidth);
        }
    }
  }, [products]);


  return (
    <section className="py-24 md:py-32 px-6 sm:px-8 lg:px-12 bg-background" id="merchandise">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section: Left-aligned and uses serif font for editorial style */}
        <div className="flex justify-between items-end mb-16 border-b pb-8 border-border/70">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
                  <span className="text-sm font-serif font-semibold text-primary tracking-wider">The Collection</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                    Curated Essentials
                </h2>
                <p className="text-muted-foreground mt-4 max-w-lg">
                    Discover carefully selected products that embody quality, sustainability, and mindfulness in every whisk.
                </p>
            </div>
            {/* View All Button on the right */}
            <a 
                href="https://www.redbubble.com/shop/ap/175680480" 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center text-base font-semibold text-primary hover:text-primary/80 transition tracking-wide underline underline-offset-4"
            >
                View All Products
            </a>
        </div>


        <div className="relative">
          <div 
            id="merch-scroll" 
            className="flex gap-10 overflow-x-auto pb-6 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" // Added styles to hide scrollbar
            onScroll={handleScroll}
          >
            {products.length === 0 ? (
              <div className="w-full flex justify-center py-20 min-w-full">
                <p className="text-muted-foreground text-center text-lg">Premium merchandise coming soon. Stay tuned.</p>
              </div>
            ) : (
              products.map((product) => (
                <a 
                  key={product.id} 
                  href={product.product_link || `/merch/${product.id}`}
                  target={product.product_link ? "_blank" : undefined}
                  rel={product.product_link ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-card rounded-lg overflow-hidden transition-all duration-300 border border-border/60 group-hover:border-primary/40 shadow-md group-hover:shadow-xl">
                    <div className="relative aspect-[3/4] bg-secondary overflow-hidden"> {/* Changed to a vertical aspect ratio */}
                      {product.image_url ? (
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 90vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                          <span className="text-muted-foreground text-sm">Product Image</span>
                        </div>
                      )}
                    </div>

                    {/* Info Block - Cleaner presentation */}
                    <div className="p-5 space-y-1 text-center">
                        <h3 className="font-serif font-semibold text-card-foreground text-xl leading-snug transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary pt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </a>
              ))
            )}
            
            {/* Spacer/CTA Card for the end of the scroll list */}
            <div className="flex-shrink-0 w-80 flex items-center justify-center">
                 <a 
                    href="https://www.redbubble.com/shop/ap/175680480" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-8 border-2 border-border/70 border-dashed rounded-lg h-full text-center hover:border-primary/70 transition-colors group/cta"
                 >
                    <ShoppingBag size={40} className="text-primary/70 group-hover/cta:text-primary transition-colors mb-4" />
                    <span className="text-lg font-serif font-semibold text-foreground mb-1">See Full Collection</span>
                    <span className="text-sm text-muted-foreground max-w-[150px]">Explore all mindful essentials in our shop.</span>
                 </a>
            </div>
          </div>
          
          {/* Scroll Buttons - Repositioned to be less intrusive */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full hover:bg-primary/90 hover:text-white transition-all flex items-center justify-center z-20 hidden md:flex backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border rounded-full hover:bg-primary/90 hover:text-white transition-all flex items-center justify-center z-20 hidden md:flex backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}