import { Leaf } from "lucide-react"

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

  // Editorial & Minimalist Theme: Dark background, light text, serif font style.
  return (
    <footer className="bg-gray-950 text-gray-200 py-16 px-6 sm:px-8 lg:px-12 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid (Responsive layout, spanning across 3 or 5 columns) */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12 pb-12">
          {/* Column 1: Logo & Mission (Takes more space for prominence) */}
          <div className="md:col-span-1 lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-2 group text-white">
              {/* Using the Leaf icon for brand consistency */}
              <Leaf size={24} className="text-primary transition-colors group-hover:text-primary/70" />
              <span className="text-xl font-bold tracking-tight">Every Whisk Way</span>
            </a>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Mindful cooking and organic living. We curate thoughtful recipes, essays, and stories for a healthier,
              more conscious kitchen.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-1 lg:col-span-1">
            {/* Minimalist divider beneath uppercase title */}
            <h4 className="font-bold mb-4 text-white text-sm tracking-widest uppercase border-b border-primary/50 pb-1">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT_EMAIL}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="/#subscribe" className="text-gray-400 hover:text-white transition">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="font-bold mb-4 text-white text-sm tracking-widest uppercase border-b border-primary/50 pb-1">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect / Socials */}
          <div className="lg:col-span-1">
            <h4 className="font-bold mb-4 text-white text-sm tracking-widest uppercase border-b border-primary/50 pb-1">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-gray-400 hover:text-primary transition duration-300"
                >
                  {link.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar: Copyright & Tagline */}
        <div className="border-t border-gray-700/50 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>&copy; {currentYear} Every Whisk Way. All rights reserved.</p>
            <p className="font-medium tracking-wider">A Conscious Culinary Journal.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}