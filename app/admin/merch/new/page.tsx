import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import MerchandiseEditor from "@/components/merchandise-editor"

export default async function NewMerchandisePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <MerchandiseEditor />
    </div>
  )
}
