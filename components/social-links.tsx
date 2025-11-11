import { Sparkles, ArrowUpRight } from "lucide-react"

export default function SocialLinks() {
  // Social links with actual brand logos
  const socials = [
    {
      name: "Pinterest",
      svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.88-.18-2.26 0-3.24l1.34-5.66s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76.97 0 1.44.73 1.44 1.6 0 .98-.62 2.44-.95 3.8-.27 1.14.57 2.07 1.7 2.07 2.03 0 3.6-2.14 3.6-5.23 0-2.73-1.96-4.64-4.76-4.64-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6a.3.3 0 0 1 .07.29l-.31 1.28c-.05.18-.17.22-.4.13-1.4-.65-2.28-2.7-2.28-4.35 0-3.6 2.61-6.9 7.53-6.9 3.95 0 7.02 2.82 7.02 6.58 0 3.93-2.48 7.09-5.92 7.09-1.15 0-2.24-.6-2.61-1.31l-.71 2.7c-.26.98-.95 2.2-1.42 2.95A12 12 0 1 0 12 0z"/></svg>,
      url: "https://www.pinterest.com/everywhiskway",
      label: "Follow us on Pinterest",
      description: "Visual inspiration & recipes",
    },
    {
      name: "Reddit",
      svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 0 1 .04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 0 1 4.03 12c0-.97.8-1.76 1.76-1.76.47 0 .9.2 1.2.5 1.2-.86 2.85-1.42 4.67-1.49l.9-4.16a.4.4 0 0 1 .48-.33l2.85.6a1.2 1.2 0 0 1 1.12-.62zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.47 3.99a.33.33 0 0 0 0 .46c.85.84 2.45.91 2.97.91.52 0 2.12-.07 2.96-.9a.33.33 0 0 0-.46-.47c-.55.54-1.68.73-2.5.73-.81 0-1.94-.19-2.5-.73a.33.33 0 0 0-.47 0z"/></svg>,
      url: "https://www.reddit.com/user/everywhiskway",
      label: "Join our community on Reddit",
      description: "Community discussions",
    },
    {
      name: "Substack",
      svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>,
      url: "https://substack.com/@everywhiskway",
      label: "Subscribe to our newsletter on Substack",
      description: "Deep-dive articles",
    },
    {
      name: "X",
      svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
      url: "https://x.com/Everywhiskway",
      label: "Follow us on X",
      description: "Daily updates & tips",
    },
    {
      name: "Medium",
      svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
      url: "https://everywhiskway.medium.com",
      label: "Read our articles on Medium",
      description: "Long-form stories",
    },
  ]

  return (
    <section className="relative py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-muted/30 via-background to-muted/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Join Our Community
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-foreground leading-[1.1] tracking-tight mb-4">
            Connect With Us
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Follow along for daily inspiration, exclusive content, and join conversations with fellow mindful cooks.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith('/') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              title={social.label}
              className="group relative"
            >
              <div className="relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <div className="text-foreground/70 group-hover:text-primary transition-colors">
                    {social.svg}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-serif font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                  {social.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3 flex-1">
                  {social.description}
                </p>

                {/* Arrow Indicator */}
                <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-light">Follow</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* External Link Badge */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3 text-primary" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-muted/30 backdrop-blur-sm rounded-2xl border border-border/50">
            <p className="text-base text-foreground font-light">
              Can't find us on your favorite platform?
            </p>
            <a 
              href="mailto:everywhiskway@outlook.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all group"
            >
              <span className="font-light">Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}