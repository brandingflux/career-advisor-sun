// app/api/auth/logout/route.ts
import { NextRequest } from 'next/server'
import { account } from '@/lib/appwrite'

export async function GET(request: NextRequest) {
  try {
    const session = await account.getSession('current')

    if (!session) {
      // No active session, redirect silently
      return Response.redirect(new URL('/', request.url))
    }

    await account.deleteSession('current')
    return Response.redirect(new URL('/', request.url))

  } catch (error: any) {
    console.error('Logout failed:', error.message)
    
    // Redirect anyway to avoid auth errors
    return Response.redirect(new URL('/', request.url))
  }
}