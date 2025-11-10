// app/blog/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

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
  // Logic: Get posts from same category, exclude current post, limit to 3
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="py-20 md:py-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Sidebar - Recommended Reads */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                {finalRecommendedPosts.length > 0 && (
                  <div>
                    <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6 font-sans">
                      Recommended Reading
                    </h2>
                    <div className="space-y-8">
                      {finalRecommendedPosts.map((recPost) => {
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
                            <article>
                              {recPost.featured_image_url && (
                                <div className="relative w-full h-32 mb-3 overflow-hidden rounded-sm bg-muted">
                                  <Image
                                    src={recPost.featured_image_url || "/placeholder.svg"}
                                    alt={recPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <time className="text-xs text-muted-foreground uppercase tracking-wider block mb-2 font-sans">
                                {recFormattedDate}
                              </time>
                              <h3 className="text-base font-serif font-light text-foreground group-hover:text-primary transition leading-snug line-clamp-2">
                                {recPost.title}
                              </h3>
                            </article>
                          </Link>
                        )
                      })}
                    </div>
                    
                    {/* View All Link */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <Link
                        href="/blog"
                        className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition font-sans"
                      >
                        View All Articles →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 order-1 lg:order-2">
              <div className="max-w-3xl mx-auto">
                {/* Header - Simplified and more spaced out */}
                <header className="mb-16 border-b border-border pb-12">
                  {/* Date is now the primary, subtle marker */}
                  <time
                    dateTime={post.created_at}
                    className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block font-sans"
                  >
                    {formattedDate}
                  </time>
                  {/* Category pill */}
                  {post.category && (
                    <Link
                      href="/blog"
                      className="inline-block text-xs uppercase tracking-wider text-primary hover:underline mb-4 font-sans"
                    >
                      {post.category}
                    </Link>
                  )}
                  {/* Title increased in size and leading, embracing the serif font */}
                  <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-foreground mb-6 leading-snug text-balance">
                    {post.title}
                  </h1>
                  {/* Excerpt made cleaner and more distinct */}
                  {post.excerpt && (
                    <p className="text-xl md:text-2xl text-muted-foreground font-light font-serif mt-6 border-l-2 border-primary pl-4">
                      {post.excerpt}
                    </p>
                  )}
                </header>

                {/* Featured Image - Removed rounded corners, border, and shadow for a cleaner, full-bleed feel within the container */}
                {post.featured_image_url && (
                  <div className="relative h-96 md:h-[600px] mb-16 overflow-hidden">
                    <Image
                      src={post.featured_image_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Content - Adjusted classes for a more classic, minimalist reading experience */}
                <div
                  className="max-w-none text-lg space-y-8 [&_p]:text-foreground [&_p]:leading-relaxed [&_p]:text-lg 
                      [&_h2]:text-4xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 
                      [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
                      [&_a]:text-primary hover:[&_a]:underline 
                      [&_strong]:font-bold [&_em]:italic 
                      [&_ul]:list-disc [&_ul]:ml-8 [&_ol]:list-decimal [&_ol]:ml-8 
                      [&_li]:text-foreground [&_li]:mb-3
                      /* Editorial Quote Style */
                      [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:text-muted-foreground [&_blockquote]:font-serif"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Back to Blog - Simplified button style */}
                <div className="mt-24 pt-8 border-t border-border">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition font-sans text-sm tracking-wider uppercase"
                  >
                    ← All Articles
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}