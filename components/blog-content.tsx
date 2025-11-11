// components\blog-content.tsx

"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

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

const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("id, title, slug, excerpt, featured_image_url, created_at, category")
          .eq("is_published", true)
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError

        if (data) {
          const fetchedPosts = data as BlogPost[]
          setPosts(fetchedPosts)

          const categoryGrouped: GroupedPosts = {}

          BLOG_CATEGORIES.filter((c) => c !== "Latest").forEach((category) => {
            categoryGrouped[category] = fetchedPosts.filter((post) => post.category === category)
          })

          setGroupedPosts(categoryGrouped)
        }
      } catch (e) {
        console.error("Error fetching blog posts:", e)
        setError("Failed to load articles. Please check your connection.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, groupedPosts, loading, error }
}

// --- Main Presentation Component (Minimalist & Editorial UI) ---

export default function BlogContent() {
  const { posts, groupedPosts, loading, error } = useBlogPosts()
  const [activeCategory, setActiveCategory] = useState<string>("Latest")

  const categories = BLOG_CATEGORIES

  const displayPosts = useMemo(
    () => (activeCategory === "Latest" ? posts : groupedPosts[activeCategory] || []),
    [activeCategory, posts, groupedPosts],
  )

  const [featuredPost, ...listPosts] = displayPosts

  // --- UI States (Loading, Error, Empty) ---

  if (loading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="border-t-2 border-primary border-solid w-8 h-8 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground font-light">Loading fresh content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center bg-red-50 border border-red-300 p-8 rounded-lg">
          <p className="text-2xl font-bold text-red-700 mb-2">Error Loading Data</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-light text-foreground mb-4">The Journal</h2>
          <p className="text-xl text-muted-foreground">No articles have been published yet.</p>
        </div>
      </div>
    )
  }

  // --- Main Content Display ---

  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <header className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-foreground leading-tight mb-4">
            The Sustainable Kitchen Journal
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Thoughtful essays on mindful cooking, zero-waste living, and sustainable kitchen practices.
          </p>
        </header>

        <div className="mb-12 border-b border-border/50">
          <nav className="flex space-x-6 sm:space-x-8 overflow-x-auto pb-3 md:pb-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-1 py-2 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap relative
                  ${
                    activeCategory === category
                      ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {activeCategory === "Latest" && featuredPost && (
          <div className="mb-12 pb-12 border-b border-border/50">
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="group cursor-pointer">
                {featuredPost.featured_image_url && (
                  <div className="mb-6 overflow-hidden rounded-sm bg-muted aspect-video">
                    <Image
                      src={featuredPost.featured_image_url || "/placeholder.svg"}
                      alt={featuredPost.title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-medium">
                    {new Date(featuredPost.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-3 group-hover:text-primary transition leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-base text-muted-foreground font-light leading-relaxed max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        )}

        {displayPosts.length > 0 && (activeCategory === "Latest" ? listPosts.length > 0 : true) && (
          <h2 className="text-xl sm:text-2xl font-serif font-light text-foreground mb-8">
            {activeCategory === "Latest" ? "Latest Articles" : activeCategory}
            <span className="text-muted-foreground ml-2 text-xs font-sans font-normal">
              ({activeCategory === "Latest" ? listPosts.length : displayPosts.length})
            </span>
          </h2>
        )}

        <div className="space-y-8 divide-y divide-border/50">
          {displayPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base text-muted-foreground font-light">No articles available in {activeCategory}.</p>
            </div>
          ) : (
            (activeCategory === "Latest" ? listPosts : displayPosts).map((post) => {
              const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })

              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer py-8 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                      {post.featured_image_url && (
                        <div className="flex-shrink-0 w-full sm:w-40 h-32 sm:h-40 rounded-sm overflow-hidden bg-muted">
                          <Image
                            src={post.featured_image_url || "/placeholder.svg"}
                            alt={post.title}
                            width={192}
                            height={192}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-medium">
                          {formattedDate}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-serif font-light text-foreground mb-3 group-hover:text-primary transition leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 max-w-2xl">
                          {post.excerpt || "Read this article..."}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
