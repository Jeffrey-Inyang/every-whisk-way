"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Product {
  id?: string
  name: string
  price: number
  image_url: string
}

export default function MerchandiseEditor({ initialProduct }: { initialProduct?: any }) {
  const [product, setProduct] = useState<Product>(
    initialProduct || {
      name: "",
      price: 0,
      image_url: "",
    },
  )
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSave = async () => {
    if (!product.name || product.price <= 0) {
      setMessage("Please fill in all required fields")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const supabase = createClient()

      const dataToSave = {
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      }

      if (initialProduct?.id) {
        const { error } = await supabase.from("merchandise").update(dataToSave).eq("id", initialProduct.id)

        if (error) {
          console.error("[v0] Update error:", error)
          throw error
        }
        setMessage("Product updated successfully!")
      } else {
        const { error } = await supabase.from("merchandise").insert([dataToSave])

        if (error) {
          console.error("[v0] Insert error:", error)
          throw error
        }
        setMessage("Product created successfully!")
      }

      setTimeout(() => router.push("/admin"), 1500)
    } catch (error: unknown) {
      console.error("[v0] Error:", error)
      setMessage(error instanceof Error ? error.message : "Error saving product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={18} />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{initialProduct ? "Edit Product" : "Add New Product"}</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Enter product name..."
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Price ($) *</label>
          <input
            type="number"
            step="0.01"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
          <input
            type="url"
            value={product.image_url}
            onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {product.image_url && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="max-w-xs h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>
          )}
        </div>

        {/* Messages */}
        {message && (
          <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-amber-600"}`}>
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  )
}
