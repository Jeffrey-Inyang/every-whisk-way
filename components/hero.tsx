// components\hero.tsx
"use client";

import { ArrowRight, Sparkles, BookOpen } from "lucide-react"

export default function Hero() {
  const backgroundStyle = {
    backgroundImage:
      'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pavel-danilyuk-7055126%20%281%29-73NjodZX9SUhbBq5bV8HKVe03Orn0S.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0" 
        style={backgroundStyle}
      >
        {/* Multi-layered Gradient Overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Subtle animated vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary animate-fade-in"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-light tracking-[0.15em] uppercase">
                Welcome to Conscious Cooking
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white leading-[1.05] tracking-tight animate-fade-in-up">
              Mindful Kitchens,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Every Whisk Way</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/30 -rotate-1 blur-sm" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl animate-fade-in-up animation-delay-200">
              A community dedicated to conscious cooking, sustainable practices, and the art of nourishing yourself 
              and your loved ones with intention.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up animation-delay-300">
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-sm text-gray-300 font-light">🌱 Sustainable Recipes</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-sm text-gray-300 font-light">📚 Kitchen Guides</span>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-sm text-gray-300 font-light">💚 Mindful Living</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <a 
                href="/#subscribe"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 font-light text-base"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Join Our Community</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="/blog"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 font-light text-base"
              >
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Read Our Stories</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Proof / Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 animate-fade-in-up animation-delay-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-white/20 backdrop-blur-sm"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-300 font-light">
                  Join <span className="text-white font-medium">1,000+</span> conscious cooks
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Stats/Info Cards */}
          <div className="lg:col-span-5 space-y-6 animate-fade-in-up animation-delay-600">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🥗</span>
                </div>
                <h3 className="text-2xl font-serif font-light text-white mb-2">500+</h3>
                <p className="text-sm text-gray-300 font-light">Sustainable Recipes</p>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-2xl font-serif font-light text-white mb-2">100+</h3>
                <p className="text-sm text-gray-300 font-light">Kitchen Guides</p>
              </div>

              {/* Card 3 - Spans full width */}
              <div className="col-span-2 p-6 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md border border-primary/20 rounded-2xl hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-light text-white mb-2">Weekly Newsletter</h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      Get curated recipes, kitchen tips, and sustainable living insights delivered every week.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}