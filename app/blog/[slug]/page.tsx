// app/blog/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

// Metadata generation remains unchanged for functionality
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const supabase = await createClient()
  const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).single()

  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) {
    notFound()
  }

  // Fetch recommended posts based on category
  const { data: recommendedPosts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, featured_image_url, created_at, category")
    .eq("is_published", true)
    .eq("category", post.category)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(3)

  // If not enough posts in same category, get recent posts from other categories
  let additionalPosts = []
  if (recommendedPosts && recommendedPosts.length < 3) {
    const { data: morePosts } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, featured_image_url, created_at, category")
      .eq("is_published", true)
      .neq("slug", slug)
      .neq("category", post.category)
      .order("created_at", { ascending: false })
      .limit(3 - recommendedPosts.length)
    
    additionalPosts = morePosts || []
  }

  const finalRecommendedPosts = [...(recommendedPosts || []), ...additionalPosts]

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Full-Width Featured Image */}
      <div className="relative w-full">
        {post.featured_image_url && (
          <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background z-10" />
            <Image
              src={post.featured_image_url || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Floating Header Container */}
        <div className="relative z-20 -mt-32 md:-mt-40 lg:-mt-48">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-8 md:p-12 shadow-2xl">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-light tracking-wide">Back to Journal</span>
                </Link>
              </div>

              {/* Category Badge */}
              {post.category && (
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-foreground mb-6 leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.created_at} className="font-light">
                    {formattedDate}
                  </time>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-light">{readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="py-16 md:py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <div className="max-w-none">
                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none
                    [&_p]:text-foreground [&_p]:leading-[1.8] [&_p]:text-lg [&_p]:mb-6 [&_p]:font-light
                    [&_p:first-of-type]:text-xl [&_p:first-of-type]:leading-[1.7] [&_p:first-of-type]:text-foreground/90
                    [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-serif [&_h2]:font-light [&_h2]:text-foreground [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:tracking-tight
                    [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-serif [&_h3]:font-light [&_h3]:text-foreground [&_h3]:mt-12 [&_h3]:mb-5 [&_h3]:tracking-tight
                    [&_h4]:text-xl [&_h4]:md:text-2xl [&_h4]:font-serif [&_h4]:font-light [&_h4]:text-foreground [&_h4]:mt-10 [&_h4]:mb-4
                    [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-primary [&_a]:transition-colors
                    [&_strong]:font-semibold [&_strong]:text-foreground [&_em]:italic [&_em]:text-foreground/90
                    [&_ul]:space-y-3 [&_ul]:my-8 [&_ul]:ml-6
                    [&_ol]:space-y-3 [&_ol]:my-8 [&_ol]:ml-6
                    [&_li]:text-foreground [&_li]:leading-relaxed [&_li]:pl-2 [&_li]:font-light
                    [&_li::marker]:text-primary
                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-8 [&_blockquote]:pr-8 [&_blockquote]:py-6 [&_blockquote]:my-10
                    [&_blockquote]:bg-muted/30 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:md:text-2xl
                    [&_blockquote]:text-foreground/80 [&_blockquote]:font-serif [&_blockquote]:font-light [&_blockquote]:leading-relaxed
                    [&_code]:text-sm [&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:font-mono [&_code]:text-primary
                    [&_pre]:bg-muted [&_pre]:p-6 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-8
                    [&_img]:rounded-lg [&_img]:my-12 [&_img]:w-full
                    [&_hr]:border-border/50 [&_hr]:my-12"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article Footer */}
                <div className="mt-20 pt-12 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm font-light tracking-wide">All Articles</span>
                    </Link>
                    
                    {post.category && (
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                      >
                        <span className="font-light">More in {post.category}</span>
                        <span className="text-primary">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Recommended Posts */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-8">
                {finalRecommendedPosts.length > 0 && (
                  <div className="bg-muted/30 rounded-lg p-8 border border-border/50">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
                      Continue Reading
                    </h2>
                    <div className="space-y-8">
                      {finalRecommendedPosts.map((recPost, index) => {
                        const recFormattedDate = new Date(recPost.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        
                        return (
                          <Link
                            key={recPost.id}
                            href={`/blog/${recPost.slug}`}
                            className="block group"
                          >
                            <article className={index !== 0 ? "pt-8 border-t border-border/50" : ""}>
                              {recPost.featured_image_url && (
                                <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden rounded-md bg-muted">
                                  <Image
                                    src={recPost.featured_image_url || "/placeholder.svg"}
                                    alt={recPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                  />
                                </div>
                              )}
                              
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <time className="text-xs text-muted-foreground font-light tracking-wide">
                                    {recFormattedDate}
                                  </time>
                                  {recPost.category && (
                                    <>
                                      <span className="text-muted-foreground/50">•</span>
                                      <span className="text-xs text-primary font-light tracking-wide">
                                        {recPost.category}
                                      </span>
                                    </>
                                  )}
                                </div>
                                
                                <h3 className="text-lg font-serif font-light text-foreground group-hover:text-primary transition leading-snug line-clamp-2">
                                  {recPost.title}
                                </h3>
                                
                                {recPost.excerpt && (
                                  <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                                    {recPost.excerpt}
                                  </p>
                                )}
                              </div>
                            </article>
                          </Link>
                        )
                      })}
                    </div>
                    
                    {/* View All Link */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition group"
                      >
                        <span>Explore All</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Share Section (Optional Enhancement) */}
                <div className="bg-background rounded-lg p-8 border border-border/50">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
                    Share Article
                  </h3>
                  <div className="flex flex-col gap-3">
                    <button className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left">
                      Copy Link
                    </button>
                    <button className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left">
                      Share on Twitter
                    </button>
                    <button className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left">
                      Share on Facebook
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}