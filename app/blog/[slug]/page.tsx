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

  const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).eq("is_published", true).single()

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    // Increased padding for more "magazine" like whitespace
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="py-20 md:py-32 px-6 sm:px-8 lg:px-12">
        {/* Slightly reduced max-width for better editorial line length */}
        <div className="max-w-2xl mx-auto">
          {/* Header - Simplified and more spaced out */}
          <header className="mb-16 border-b border-border pb-12">
            {/* Date is now the primary, subtle marker */}
            <time dateTime={post.created_at} className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block font-sans">
              {formattedDate}
            </time>
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

      <Footer />
    </main>
  )
}
