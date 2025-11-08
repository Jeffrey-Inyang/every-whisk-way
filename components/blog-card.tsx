import Link from "next/link"
import Image from "next/image"

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    featured_image_url: string | null
    created_at: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer">
        <div className="flex gap-6">
          {post.featured_image_url && (
            <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-sm overflow-hidden bg-muted">
              <Image
                src={post.featured_image_url || "/placeholder.svg"}
                alt={post.title}
                width={112}
                height={112}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">{formattedDate}</p>
            <h3 className="text-lg md:text-xl font-serif font-bold text-foreground group-hover:text-primary transition mb-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt || "Read this post..."}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
