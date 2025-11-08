import { ArrowRight } from "lucide-react"

export default function HeroRedesign() {
  // Common background styles for the theme
  const backgroundStyle = {
    backgroundImage:
      'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pavel-danilyuk-7055126%20%281%29-73NjodZX9SUhbBq5bV8HKVe03Orn0S.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }

  return (
    <section className="relative py-24 md:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image Container */}
      <div
        className="absolute inset-0"
        style={backgroundStyle}
      >
        {/* Gradient Overlay: Darker on the left to highlight content, subtly fading to a lighter right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      {/* Content Container: Left-aligned and wider */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content Column */}
        <div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight max-w-lg">
            Mindful Kitchens, Every Whisk Way
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-md">
            A community dedicated to <b>conscious cooking</b>, sustainable practices, and the art of nourishing yourself and
            your loved ones with intention.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#subscribe"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition font-semibold text-base shadow-lg"
            >
              Join Our Community
              <ArrowRight size={20} />
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/90 hover:bg-white text-foreground rounded-sm transition font-semibold text-base border border-muted shadow-md"
            >
              Read Our Stories
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
        
        {/* Visual Breathing Room / Exposure of the Image */}
        <div className="hidden lg:block h-full">
            {/* This column is intentionally left empty to allow the background image to show through more prominently on the right side on large screens */}
        </div>

      </div>
    </section>
  )
}
