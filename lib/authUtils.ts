// lib/authUtils.ts
import { account } from './appwrite'

export const clearAppwriteCache = async () => {
  try {
    // Try to get session → will throw if none exists
    const session = await account.getSession('current')

    // If session exists, delete it
    if (session) {
      await account.deleteSession('current')
    }

    // Force refresh of user state
    await new Promise(resolve => setTimeout(resolve, 200))
    window.location.reload()

  } catch (error) {
    console.log('No active session found – safe to proceed')
    window.location.reload()
  }
}