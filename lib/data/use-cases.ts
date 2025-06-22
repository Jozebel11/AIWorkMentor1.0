// Updated use cases data service using Supabase
import { DatabaseService, UseCase } from '@/lib/database/supabase'

export async function getUseCasesByJobId(jobId: string): Promise<UseCase[]> {
  try {
    return await DatabaseService.getUseCasesByJobId(jobId)
  } catch (error) {
    console.error('Error fetching use cases:', error)
    return []
  }
}

export async function getUseCaseByJobAndId(jobId: string, useCaseId: string): Promise<UseCase | null> {
  try {
    return await DatabaseService.getUseCaseByJobAndId(jobId, useCaseId)
  } catch (error) {
    console.error('Error fetching use case:', error)
    return null
  }
}