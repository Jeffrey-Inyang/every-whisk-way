"use client"

import { useState, useCallback } from "react"
import { Menu, X, Leaf, Mail } from "lucide-react"

// 🔄 MODIFIED: Updated target to "_blank" when isMailto is true.
const NavLink = ({ href, children, className, onClick, isMailto }) => (
  <a
    href={href}
    className={className}
    onClick={onClick}
    // Set target="_blank" only if isMailto is true
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

const CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition font-medium text-sm shadow-md"
const MOBILE_CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 px-4 py-2 mt-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition font-medium text-sm w-full"
const DESKTOP_NAV_LINK_CLASS =
  "text-foreground/80 hover:text-primary font-serif text-base transition relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
const MOBILE_NAV_LINK_CLASS = "text-foreground hover:text-primary font-medium text-base transition py-1"

export default function NavbarRedesign() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink href="/" className="flex items-center gap-3 group">
            <Leaf size={28} className="text-primary transition-colors group-hover:text-primary/80" />
            <span className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tighter">
              Every Whisk Way
            </span>
          </NavLink>

          {/* Desktop Navigation & CTA */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.name} href={item.href} isMailto={item.isMailto} className={DESKTOP_NAV_LINK_CLASS}>
                  {item.name}
                </NavLink>
              ))}
            </div>

            <NavLink href="/#subscribe" className={CTA_BUTTON_CLASS}>
              <Mail size={16} />
              Join Newsletter
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden pb-4 flex flex-col gap-3 border-t border-border pt-4 px-6 sm:px-8 bg-background/95">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              isMailto={item.isMailto}
              className={MOBILE_NAV_LINK_CLASS}
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink href="/#subscribe" className={MOBILE_CTA_BUTTON_CLASS} onClick={closeMenu}>
            <Mail size={16} />
            Join Newsletter
          </NavLink>
        </div>
      )}
    </nav>
  )
}
