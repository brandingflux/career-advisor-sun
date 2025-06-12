// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get()
        setUser(currentUser)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  return { user, loading }
}