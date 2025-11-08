"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Edit } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image_url: string | null
}

export default function AdminMerchandiseList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("merchandise").select("*").order("created_at", { ascending: false })

    if (data) setProducts(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setDeleting(id)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("merchandise").delete().eq("id", id)
      
      if (error) {
        console.error("Delete error:", error)
        alert(`Error deleting product: ${error.message}`)
      } else {
        // Remove from local state immediately for better UX
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("An unexpected error occurred while deleting the product")
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading merchandise...</p>
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/merch/new">
        <Button className="w-full sm:w-auto">Add New Product</Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-4">
        {products.length === 0 ? (
          <p className="text-muted-foreground col-span-full">No merchandise yet. Add your first product!</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-sm transition"
            >
              <div className="relative h-40 bg-muted">
                {product.image_url ? (
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-primary font-bold mb-4">${product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <Link href={`/admin/merch/edit/${product.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Edit size={16} />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                  >
                    <Trash2 size={16} />
                    {deleting === product.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}