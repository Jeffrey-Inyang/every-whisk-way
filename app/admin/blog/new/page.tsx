import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import BlogEditor from "@/components/blog-editor"

export default async function NewBlogPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogEditor user={data.user} />
    </div>
  )
}
