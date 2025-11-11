// components\navbar.tsx
"use client"

import { useState, useCallback, useEffect } from "react"
import { Menu, X, Leaf, Mail, ChevronDown } from "lucide-react"

const NavLink = ({ href, children, className, onClick, isMailto }) => (
  <a
    href={href}
    className={className}
    onClick={onClick}
    {...(isMailto && { target: "_blank", rel: "noopener noreferrer" })} 
  >
    {children}
  </a>
)

const NAV_ITEMS = [
  { name: "Home", href: "/", isMailto: false },
  { name: "Blog", href: "/blog", isMailto: false },
  { name: "Contact", href: "mailto:everywhiskway@outlook.com", isMailto: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50" 
          : "bg-background/80 backdrop-blur-sm border-b border-border/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <NavLink href="/" className="flex items-center gap-3 group">
            <div className={`transition-all duration-300 ${
              scrolled ? "w-10 h-10" : "w-12 h-12"
            } rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20`}>
              <Leaf className={`transition-all duration-300 ${
                scrolled ? "w-5 h-5" : "w-6 h-6"
              } text-primary group-hover:rotate-12`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-light text-foreground tracking-tight transition-all duration-300 ${
                scrolled ? "text-xl" : "text-2xl"
              }`}>
                Every Whisk Way
              </span>
              <span className="text-xs text-muted-foreground font-light -mt-0.5 hidden sm:block">
                Conscious Culinary Journal
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.name} 
                  href={item.href} 
                  isMailto={item.isMailto}
                  className="relative text-foreground/80 hover:text-primary font-light text-base transition-colors group"
                >
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <NavLink 
              href="/#subscribe"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all font-light text-sm group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Newsletter</span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-border/30 bg-background/95 backdrop-blur-md space-y-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              isMailto={item.isMailto}
              className="block text-foreground hover:text-primary font-light text-base transition-colors py-2"
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}
          
          <div className="pt-4 border-t border-border/30">
            <NavLink 
              href="/#subscribe"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-light text-sm"
              onClick={closeMenu}
            >
              <Mail className="w-4 h-4" />
              <span>Join Newsletter</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}