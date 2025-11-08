import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Merchandise from "@/components/merchandise"
import Reviews from "@/components/reviews"
import EmailSubscription from "@/components/email-subscription"
import SocialLinks from "@/components/social-links"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Merchandise />
      <Reviews />
      <EmailSubscription />
      <SocialLinks />
      <Footer />
    </main>
  )
}
