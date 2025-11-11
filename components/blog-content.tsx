// components\blog-content.tsx

"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Sparkles } from "lucide-react"

// --- Configuration ---

// Defined categories reflecting the niche (Cookbooks, Products, etc.)
const BLOG_CATEGORIES: string[] = [
  "Latest",
  "Recipes & Cookbooks",
  "Kitchen Finds",
  "Sustainable Living",
  "Home Decor",
]

// --- Interfaces (Kept consistent) ---

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image_url: string | null
  created_at: string
  category: string
}

interface GroupedPosts {
  [key: string]: BlogPost[]
}

// --- Data Fetching and State Logic (Custom Hook) ---

const INITIAL_LIMIT = 9 // Initial number of posts to fetch (1 featured + 8 list)
const LOAD_MORE_AMOUNT = 8 // Number of additional posts to load

interface UseBlogPostsProps {
  initialLimit: number
  loadMoreAmount: number
}

const useBlogPosts = ({ initialLimit, loadMoreAmount }: UseBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false) // New loading state for 'Load More'
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true) // New state to track if more posts exist
  const [offset, setOffset] = useState(0) // Tracks the current offset

  // Function to fetch posts from Supabase
  const fetchPosts = useCallback(async (currentOffset: number, isInitial: boolean) => {
    isInitial ? setLoading(true) : setLoadingMore(true)
    if (isInitial) setError(null)

    const limit = isInitial ? initialLimit : loadMoreAmount
    const from = currentOffset
    const to = currentOffset + limit - 1
    
    try {
      const supabase = createClient()
      // We fetch 'limit + 1' to check if there are more posts available
      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, featured_image_url, created_at, category", { count: 'exact' })
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to)

      if (fetchError) throw fetchError

      if (data) {
        const fetchedPosts = data as BlogPost[]
        
        // Determine if there are more posts by checking the number of items fetched
        // Since we used .range(from, to) to fetch 'limit' items, if we got fewer than 'limit', there are no more.
        const receivedCount = fetchedPosts.length
        const moreAvailable = receivedCount === limit

        if (isInitial) {
          setPosts(fetchedPosts)
          setOffset(limit) // Update offset for the next load

          // Group all initially fetched posts for category tabs
          const categoryGrouped: GroupedPosts = {}
          BLOG_CATEGORIES.filter((c) => c !== "Latest").forEach((category) => {
            categoryGrouped[category] = fetchedPosts.filter((post) => post.category === category)
          })
          setGroupedPosts(categoryGrouped)
          
        } else {
          setPosts(prevPosts => [...prevPosts, ...fetchedPosts])
          setOffset(prevOffset => prevOffset + receivedCount)
        }
        
        setHasMore(moreAvailable)

      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.error("Error fetching blog posts:", e)
      if (isInitial) setError("Failed to load articles. Please check your connection.")
    } finally {
      isInitial ? setLoading(false) : setLoadingMore(false)
    }
  }, [initialLimit, loadMoreAmount])

  // Initial fetch on component mount
  useEffect(() => {
    fetchPosts(0, true)
  }, [fetchPosts])
  
  // Function for the 'Load More' button
  const loadMorePosts = useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchPosts(offset, false)
    }
  }, [hasMore, loadingMore, offset, fetchPosts])

  return { posts, groupedPosts, loading, loadingMore, error, hasMore, loadMorePosts }
}

// --- Main Presentation Component (Minimalist & Editorial UI) ---

export default function BlogContent() {
  // Use the updated hook
  const { 
    posts, 
    groupedPosts, 
    loading, 
    loadingMore, // Get new state
    error, 
    hasMore, // Get new state
    loadMorePosts // Get new function
  } = useBlogPosts({ initialLimit: INITIAL_LIMIT, loadMoreAmount: LOAD_MORE_AMOUNT })
  
  const [activeCategory, setActiveCategory] = useState<string>("Latest")

  const categories = BLOG_CATEGORIES

  const displayPosts = useMemo(
    () => (activeCategory === "Latest" ? posts : groupedPosts[activeCategory] || []),
    [activeCategory, posts, groupedPosts],
  )

  const [featuredPost, ...listPosts] = displayPosts
  
  // The posts for the grid are the listPosts if "Latest" is active, otherwise all displayPosts for the category
  const gridPosts = activeCategory === "Latest" ? listPosts : displayPosts

  // --- UI States (Loading, Error, Empty) ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-8">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-serif font-light text-foreground mb-3">Loading Journal</h2>
          <p className="text-base text-muted-foreground font-light">Curating thoughtful content for you...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-serif font-light text-foreground mb-3">Unable to Load Content</h2>
          <p className="text-base text-muted-foreground font-light mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-light"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-4xl font-serif font-light text-foreground mb-4">The Journal</h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Our first stories are being carefully crafted. Check back soon for thoughtful essays on sustainable living.
          </p>
        </div>
      </div>
    )
  }

  // --- Main Content Display ---

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <header className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">The Journal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-light tracking-tight text-foreground leading-[1.1] mb-6">
            The Sustainable Kitchen Journal
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Thoughtful essays on mindful cooking, zero-waste living, and the art of sustainable kitchen practices.
          </p>
        </header>

        {/* Category Navigation */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center justify-center">
            <nav className="inline-flex items-center gap-2 p-2 bg-muted/30 rounded-full border border-border/50">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    relative px-6 py-2.5 text-sm font-light tracking-wide transition-all duration-300 rounded-full whitespace-nowrap
                    ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }
                  `}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Featured Post - Hero Style */}
        {activeCategory === "Latest" && featuredPost && (
          <div className="mb-20 lg:mb-28">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-2xl bg-muted border border-border/50 hover:border-primary/30 transition-all duration-500">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  {featuredPost.featured_image_url && (
                    <div className="relative h-80 lg:h-[600px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={featuredPost.featured_image_url || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase bg-primary text-primary-foreground rounded-full shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Content Side */}
                  <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <time className="text-sm text-muted-foreground font-light tracking-wide">
                        {new Date(featuredPost.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-foreground mb-6 leading-[1.15] tracking-tight group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-base lg:text-lg text-muted-foreground font-light leading-relaxed mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-sm font-light text-primary group-hover:gap-4 transition-all">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Section Header for Article List */}
        {gridPosts.length > 0 && (
          <div className="mb-12 flex items-center justify-between border-b border-border/50 pb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-foreground tracking-tight">
                {activeCategory === "Latest" ? "Latest Articles" : activeCategory}
              </h2>
              <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-3 text-xs font-medium text-muted-foreground bg-muted rounded-full">
                {gridPosts.length}
              </span>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {gridPosts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-serif font-light text-foreground mb-3">No Articles Yet</h3>
              <p className="text-base text-muted-foreground font-light">
                We're working on content for {activeCategory}. Check back soon!
              </p>
            </div>
          ) : (
            gridPosts.map((post) => {
              const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full flex flex-col bg-background rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    {/* Image */}
                    {post.featured_image_url && (
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Image
                          src={post.featured_image_url || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-background/90 backdrop-blur-sm text-foreground rounded-full border border-border/50">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <time className="text-xs text-muted-foreground font-light tracking-wide">
                          {formattedDate}
                        </time>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-serif font-light text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 mb-4 flex-1">
                        {post.excerpt || "Discover insights on sustainable living and mindful cooking practices."}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-sm font-light text-primary group-hover:gap-3 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })
          )}
        </div>

        {/* Load More / Pagination Logic (Only for 'Latest' category) */}
        {activeCategory === "Latest" && hasMore && (
          <div className="mt-16 text-center">
            <button 
              onClick={loadMorePosts} // <--- FIX APPLIED HERE
              disabled={loadingMore} // Disable button while loading
              className="inline-flex items-center gap-3 px-8 py-4 bg-muted hover:bg-muted/80 text-foreground rounded-full border border-border/50 hover:border-primary/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-light">
                {loadingMore ? "Loading..." : "Load More Articles"}
              </span>
              {!loadingMore && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              {loadingMore && (
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}