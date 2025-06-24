// /app/api/auth/clear-sessions/route.ts
import { NextRequest } from 'next/server'
import { account } from '@/lib/appwrite'

export async function GET(request: NextRequest) {
  try {
    // Get list of all sessions
    const sessionList = await account.listSessions().catch(() => ({ sessions: [] }))

    // Delete all existing sessions
    for (const session of sessionList.sessions) {
      await account.deleteSession(session.$id)
    }

    console.log('✅ All sessions cleared')
    return Response.json({ success: true, message: 'All sessions cleared' })

  } catch (error: any) {
    console.error('❌ Failed to clear sessions:', error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}