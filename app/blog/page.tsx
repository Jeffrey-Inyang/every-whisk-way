import Navbar from "@/components/navbar"
import BlogContent from "@/components/blog-content"
import Footer from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <BlogContent />
      <Footer />
    </main>
  )
}
