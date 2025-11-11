// components/ShareButtons.tsx
"use client"

import { useCallback } from "react"
import { toast } from "react-hot-toast" // Assuming you have a toast notification library installed, like react-hot-toast
import { Twitter, Facebook, Link as LinkIcon } from "lucide-react"

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  // Construct the full URL using the current window's host
  // This assumes the component is rendered on the page you want to share
  const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `https://example.com/blog/${slug}`
  
  // 1. Copy Link Logic
  const handleCopyLink = useCallback(async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(articleUrl)
        // Use a toast notification if available for better UX
        // If you don't use react-hot-toast, you can replace this with a simple alert or console message
        // toast.success("Link copied to clipboard!")
        console.log("Link copied to clipboard:", articleUrl) 
        alert("Link copied to clipboard!") // Fallback alert
      } catch (err) {
        console.error("Failed to copy text: ", err)
        alert(`Could not copy link. URL: ${articleUrl}`)
      }
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = articleUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      // toast.success("Link copied to clipboard!")
      alert("Link copied to clipboard!") // Fallback alert
    }
  }, [articleUrl])
  
  // 2. Share on Twitter Logic
  const handleShareTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(articleUrl)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
  }, [title, articleUrl])
  
  // 3. Share on Facebook Logic
  const handleShareFacebook = useCallback(() => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
  }, [articleUrl])

  return (
    <div className="flex flex-col gap-3">
      <button 
        onClick={handleCopyLink}
        className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left inline-flex items-center gap-3"
      >
        <LinkIcon className="w-4 h-4" />
        Copy Link
      </button>
      <button 
        onClick={handleShareTwitter}
        className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left inline-flex items-center gap-3"
      >
        <Twitter className="w-4 h-4" />
        Share on Twitter
      </button>
      <button 
        onClick={handleShareFacebook}
        className="w-full px-4 py-3 text-sm font-light text-foreground hover:text-primary bg-muted/50 hover:bg-muted border border-border/50 rounded-md transition text-left inline-flex items-center gap-3"
      >
        <Facebook className="w-4 h-4" />
        Share on Facebook
      </button>
    </div>
  )
}