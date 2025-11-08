"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Edit } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  is_published: boolean
  created_at: string
}

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, is_published, created_at")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })

    if (data) setPosts(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    const supabase = createClient()
    await supabase.from("posts").delete().eq("id", id)
    fetchPosts()
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading posts...</p>
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/blog/new">
        <Button className="w-full sm:w-auto">Create New Post</Button>
      </Link>

      <div className="space-y-2">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center p-4 bg-card border border-border rounded-lg hover:shadow-sm transition"
            >
              <div>
                <h3 className="font-semibold text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()} •{" "}
                  <span className={post.is_published ? "text-green-600" : "text-amber-600"}>
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog/edit/${post.id}`}>
                  <Button size="sm" variant="outline">
                    <Edit size={16} />
                    Edit
                  </Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
