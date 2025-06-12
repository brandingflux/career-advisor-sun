"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation' // for logout redirect
import { Menu, X, LogIn, LogOut } from "lucide-react" // add icons
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth" // your custom hook

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      const session = await account.getSession('current')
  
      if (session) {
        await fetch('/api/auth/logout')
      }
  
      router.push('/')
      window.location.reload()
  
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/')
      window.location.reload()
    }
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Career Quiz", href: "/quiz" },
    { name: "Roadmaps", href: "/roadmap" },
    { name: "Chat Advisor", href: "/chat" },
    { name: "Resume Checker", href: "/resume" },
    { name: "Internships", href: "/internships" },
    { name: "Resources", href: "/resources" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">TechPathAI</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Button */}
            {!loading && (
              <Button asChild size="sm" className="ml-4">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                )}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn("md:hidden", {
          block: isMenuOpen,
          hidden: !isMenuOpen,
        })}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Button */}
          <div className="pt-2">
            {!loading && (
              <Button asChild className="w-full">
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full justify-center">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 w-full justify-center">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}