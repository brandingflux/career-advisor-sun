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
        console.log('🟢 Authenticated as:', currentUser.name)
        setUser(currentUser)
      } catch (err) {
        console.log('🔴 Not logged in')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  return { user, loading }
}