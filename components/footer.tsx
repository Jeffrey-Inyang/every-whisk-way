
// components\footer.tsx

import { Leaf, Mail, ArrowUpRight } from "lucide-react"

// Set the common email address as a constant for easy maintenance
const CONTACT_EMAIL = "everywhiskway@outlook.com"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Define social links with actual brand logos
  const socialLinks = [
    { 
      href: "https://www.pinterest.com/everywhiskway", 
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.88-.18-2.26 0-3.24l1.34-5.66s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76.97 0 1.44.73 1.44 1.6 0 .98-.62 2.44-.95 3.8-.27 1.14.57 2.07 1.7 2.07 2.03 0 3.6-2.14 3.6-5.23 0-2.73-1.96-4.64-4.76-4.64-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6a.3.3 0 0 1 .07.29l-.31 1.28c-.05.18-.17.22-.4.13-1.4-.65-2.28-2.7-2.28-4.35 0-3.6 2.61-6.9 7.53-6.9 3.95 0 7.02 2.82 7.02 6.58 0 3.93-2.48 7.09-5.92 7.09-1.15 0-2.24-.6-2.61-1.31l-.71 2.7c-.26.98-.95 2.2-1.42 2.95A12 12 0 1 0 12 0z"/></svg>,
      label: "Pinterest" 
    },
    { 
      href: "https://www.reddit.com/user/everywhiskway", 
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 0 1 .04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 0 1 4.03 12c0-.97.8-1.76 1.76-1.76.47 0 .9.2 1.2.5 1.2-.86 2.85-1.42 4.67-1.49l.9-4.16a.4.4 0 0 1 .48-.33l2.85.6a1.2 1.2 0 0 1 1.12-.62zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.47 3.99a.33.33 0 0 0 0 .46c.85.84 2.45.91 2.97.91.52 0 2.12-.07 2.96-.9a.33.33 0 0 0-.46-.47c-.55.54-1.68.73-2.5.73-.81 0-1.94-.19-2.5-.73a.33.33 0 0 0-.47 0z"/></svg>,
      label: "Reddit" 
    },
    { 
      href: "https://substack.com/@everywhiskway", 
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>,
      label: "Substack" 
    },
    { 
      href: "https://x.com/Everywhiskway", 
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
      label: "X" 
    },
    { 
      href: "https://everywhiskway.medium.com", 
      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>,
      label: "Medium" 
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Newsletter", href: "/#subscribe" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black text-gray-100 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Column - Spans more space */}
            <div className="lg:col-span-5 space-y-6">
              <a href="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-serif font-light text-white tracking-tight">
                  Every Whisk Way
                </span>
              </a>
              
              <p className="text-base text-gray-400 font-light leading-relaxed max-w-md">
                A mindful approach to cooking and organic living. We curate thoughtful recipes, essays, and stories 
                for a healthier, more conscious kitchen.
              </p>

              {/* Newsletter CTA */}
              <div className="pt-4">
                <a 
                  href="/#subscribe"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all group shadow-lg hover:shadow-primary/20"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-light">Join Our Newsletter</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors font-light text-sm inline-flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
                <li>
                  <a 
                    href={`mailto:${CONTACT_EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary transition-colors font-light text-sm inline-flex items-center gap-2 group"
                  >
                    <span>Contact</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
                Legal
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors font-light text-sm inline-flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Connect */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-11 h-11 rounded-full bg-gray-800/50 hover:bg-primary/10 border border-gray-700/50 hover:border-primary/30 flex items-center justify-center text-gray-400 hover:text-primary transition-all group"
                  >
                    {link.svg}
                  </a>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-6 font-light leading-relaxed">
                Follow us for daily inspiration, recipes, and sustainable living tips.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-light">
              © {currentYear} Every Whisk Way. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 font-light italic">
              A Conscious Culinary Journal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
