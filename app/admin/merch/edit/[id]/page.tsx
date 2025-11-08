//app\admin\merch\edit\[id]\page.tsx

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import MerchandiseEditor from "@/components/merchandise-editor"

export default async function EditMerchandisePage({
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

  const { data: product } = await supabase.from("merchandise").select("*").eq("id", id).single()

  if (!product) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      <MerchandiseEditor initialProduct={product} />
    </div>
  )
}
