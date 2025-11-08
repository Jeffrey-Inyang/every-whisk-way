"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import Image from "next/image"

interface Review {
  id: string
  author_name: string
  content: string
  rating: number
  profile_image_url: string | null
  created_at: string
}

export default function AdminReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    author_name: "",
    content: "",
    rating: 5,
    profile_image_url: "",
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

    if (data) setReviews(data)
    setLoading(false)
  }

  const handleAddReview = async () => {
    if (!formData.author_name || !formData.content) {
      alert("Please fill in all fields")
      return
    }

    const supabase = createClient()
    const { error } = await supabase.from("reviews").insert([
      {
        author_name: formData.author_name,
        content: formData.content,
        rating: formData.rating,
        profile_image_url: formData.profile_image_url || null,
      },
    ])

    if (!error) {
      setFormData({ author_name: "", content: "", rating: 5, profile_image_url: "" })
      fetchReviews()
    }
  }

  const handleUpdateReview = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("reviews")
      .update({
        author_name: formData.author_name,
        content: formData.content,
        rating: formData.rating,
        profile_image_url: formData.profile_image_url || null,
      })
      .eq("id", id)

    if (!error) {
      setEditingId(null)
      setFormData({ author_name: "", content: "", rating: 5, profile_image_url: "" })
      fetchReviews()
    }
  }

  const handleEdit = (review: Review) => {
    setEditingId(review.id)
    setFormData({
      author_name: review.author_name,
      content: review.content,
      rating: review.rating,
      profile_image_url: review.profile_image_url || "",
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return

    const supabase = createClient()
    await supabase.from("reviews").delete().eq("id", id)
    fetchReviews()
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading reviews...</p>
  }

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4">{editingId ? "Edit Review" : "Add New Review"}</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Reviewer Name</label>
            <input
              type="text"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              placeholder="e.g., Sarah Johnson"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Profile Image URL</label>
            <input
              type="url"
              value={formData.profile_image_url}
              onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
              placeholder="https://example.com/profile.jpg"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formData.profile_image_url && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={formData.profile_image_url || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Review Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What did they love about Every Whisk Way?"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Rating (1-5 stars)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            {editingId ? (
              <>
                <Button onClick={() => handleUpdateReview(editingId)} className="flex-1">
                  Update Review
                </Button>
                <Button
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ author_name: "", content: "", rating: 5, profile_image_url: "" })
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleAddReview} className="w-full">
                Add Review
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">All Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Add your first review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-card border border-border rounded-lg hover:shadow-sm transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {review.profile_image_url ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review.profile_image_url || "/placeholder.svg"}
                        alt={review.author_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary/60">{review.author_name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{review.author_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {Array(review.rating).fill("⭐").join("")} • {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(review)}>
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(review.id)}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-foreground italic">"{review.content}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
