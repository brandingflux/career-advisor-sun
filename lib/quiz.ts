// lib/quiz.ts
import { databases } from '@/lib/appwrite'
import { QuizResponse } from '@/types'

export type QuizResponse = {
  userId: string
  responses: string
  createdAt: string
}

export const saveQuizResponse = async (
  userId: string,
  responses: Record<string, any>
) => {
  console.log('📥 Saving quiz response for userId:', userId)

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid userId: must be a string')
  }

  if (userId.length > 36) {
    console.warn('⚠️ userId exceeds 36 characters:', userId)
  }

  if (!/^[a-zA-Z0-9._\-]+$/.test(userId)) {
    console.warn('⚠️ userId contains invalid characters:', userId)
  }

  try {
    await databases.createDocument(
      'careeradvisor', // database ID
      '6848e0a5002af72523a0', // collection ID
      'unique()', // auto-generated document ID
      {
        userId,
        responses: JSON.stringify(responses),
        createdAt: new Date().toISOString()
      }
    )

    console.log('✅ Quiz response saved successfully')
  } catch (error) {
    console.error('❌ Failed to save quiz:', error)
    throw error
  }
}