import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">TechPathAI</h3>
            <p className="text-slate-600 text-sm">AI-powered career guidance for tech students and professionals.</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz" className="text-slate-600 hover:text-primary text-sm">
                  Career Quiz
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-slate-600 hover:text-primary text-sm">
                  Career Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-600 hover:text-primary text-sm">
                  AI Chat Advisor
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-slate-600 hover:text-primary text-sm">
                  Resume Checker
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-slate-600 hover:text-primary text-sm">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/internships" className="text-slate-600 hover:text-primary text-sm">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-primary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-primary text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  className="text-slate-600 hover:text-primary text-sm inline-flex items-center"
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-slate-600 text-sm text-center">
            © {new Date().getFullYear()} TechPathAI. Developed by Muhammad Umar Aminu, Muhammad Khalifa, Ahmad Badawi,
            and Aliyu Rabiu Sulaiman at Skyline University Hackathon.
          </p>
        </div>
      </div>
    </footer>
  )
}
