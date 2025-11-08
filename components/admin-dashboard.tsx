"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AdminBlogList from "./admin-blog-list"
import AdminMerchandiseList from "./admin-merchandise-list"
import AdminReviewsList from "./admin-reviews-list"
import { LogOut } from "lucide-react"

interface User {
  id: string
  email?: string
}

export default function AdminDashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState("posts")
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex gap-2 items-center bg-transparent">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeTab === "posts"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("merchandise")}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeTab === "merchandise"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Merchandise
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-medium transition whitespace-nowrap ${
              activeTab === "reviews"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === "posts" && <AdminBlogList />}
          {activeTab === "merchandise" && <AdminMerchandiseList />}
          {activeTab === "reviews" && <AdminReviewsList />}
        </div>
      </div>
    </div>
  )
}
