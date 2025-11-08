import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import BlogEditor from "@/components/blog-editor"

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("author_id", userData.user.id)
    .single()

  if (!post) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogEditor user={userData.user} initialPost={post} />
    </div>
  )
}
