// lib/appwrite.ts
import { Client, Account, Databases } from 'appwrite'

const client = new Client()

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

if (!PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID in .env.local')
}

client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject(PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)

// Types for better DX
export type User = {
  $id: string;
  email: string;
  name: string;
};

export type QuizResponse = {
  userId: string;
  responses: string; // JSON string
  createdAt: string;
};

export { client };