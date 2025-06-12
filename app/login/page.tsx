"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { account } from '@/lib/appwrite'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (isLogin) {
        // Log in existing user
        await account.createEmailPasswordSession(email, password)
      } else {
        // Sign up new user
        await account.create('unique()', email, password, name)
      }

      // Redirect after success
      router.push('/quiz')
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message || 'An error occurred')
    }
  }

  return (
    <main className="container mx-auto max-w-md py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isLogin ? 'Log In' : 'Sign Up'}
      </h1>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </main>
  )
}