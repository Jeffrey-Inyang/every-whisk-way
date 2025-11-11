"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image_url: string
  is_published: boolean
  category: string // Added category field
}

interface User {
  id: string
}

const BLOG_CATEGORIES = ["Recipes & Cookbooks", "Kitchen Finds", "Sustainable Living", "Home Decor"]

export default function BlogEditor({ user, initialPost }: { user: User; initialPost?: any }) {
  const [post, setPost] = useState<BlogPost>(
    initialPost || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      featured_image_url: "",
      is_published: false,
      category: "", // Initialize category
    },
  )
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setPost({
      ...post,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSave = async (publish: boolean) => {
    if (!post.title || !post.slug || !post.content || !post.category) {
      setMessage("Please fill in all required fields including category")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const supabase = createClient()
      const postData = {
        ...post,
        is_published: publish,
        author_id: user.id,
      }

      if (initialPost?.id) {
        // Update existing post
        const { error } = await supabase.from("posts").update(postData).eq("id", initialPost.id)

        if (error) throw error
        setMessage("Post updated successfully!")
      } else {
        // Create new post
        const { error } = await supabase.from("posts").insert([postData])

        if (error) throw error
        setMessage("Post created successfully!")
      }

      setTimeout(() => router.push("/admin"), 1500)
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Error saving post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           {" "}
      <div className="flex items-center gap-4 mb-8">
               {" "}
        <Link href="/admin">
                   {" "}
          <Button variant="ghost" size="sm">
                        <ArrowLeft size={18} />            Back          {" "}
          </Button>
                 {" "}
        </Link>
                <h1 className="text-3xl font-bold text-foreground">{initialPost ? "Edit Post" : "Create New Post"}</h1> 
           {" "}
      </div>
           {" "}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                {/* Title */}       {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Post Title *</label>         {" "}
          <input
            type="text"
            value={post.title}
            onChange={handleTitleChange}
            placeholder="Enter post title..."
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
                 {" "}
        </div>
                {/* Slug */}       {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">URL Slug *</label>         {" "}
          <input
            type="text"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
            placeholder="auto-generated-slug"
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
                 {" "}
        </div>
               {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category *</label>         {" "}
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
                        <option value="">Select a category...</option>           {" "}
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                                {category}             {" "}
              </option>
            ))}
                     {" "}
          </select>
                 {" "}
        </div>
                {/* Excerpt */}       {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>         {" "}
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            placeholder="Brief summary of your post (optional)..."
            rows={2}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
                 {" "}
        </div>
                {/* Featured Image URL */}       {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Featured Image URL</label>       
           {" "}
          <input
            type="url"
            value={post.featured_image_url}
            onChange={(e) => setPost({ ...post, featured_image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
                 {" "}
        </div>
                {/* Content */}       {" "}
        <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Content (HTML) *</label>         {" "}
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Enter your post content in HTML format..."
            rows={12}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          />
                 {" "}
        </div>
                {/* Messages */}       {" "}
        {message && (
          <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-amber-600"}`}>
                        {message}         {" "}
          </p>
        )}
                {/* Buttons */}       {" "}
        <div className="flex gap-4 pt-4">
                   {" "}
          <Button onClick={() => handleSave(false)} disabled={loading} variant="outline">
                        {loading ? "Saving..." : "Save as Draft"}         {" "}
          </Button>
                   {" "}
          <Button onClick={() => handleSave(true)} disabled={loading}>
                        {loading ? "Publishing..." : "Publish"}         {" "}
          </Button>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  )
}