"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { account } from '@/lib/appwrite'
import { clearAppwriteSessionCache } from '@/lib/appwrite'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      // Call API route to delete session
      await fetch('/api/auth/logout', { method: 'GET' })

      // Clear local Appwrite cache
      clearAppwriteSessionCache()
      document.cookie = 'a_sid=; Max-Age=0; path=/;'
      
      // Reload UI to refresh auth state
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

  if (loading) {
    return null
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">TechPathAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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
            <Button asChild size="sm" className="ml-4">
              <Link href="/quiz">Start Quiz</Link>
            </Button>
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
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
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

          <div className="pt-2">
          {user && !loading ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 justify-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login / Signup
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}