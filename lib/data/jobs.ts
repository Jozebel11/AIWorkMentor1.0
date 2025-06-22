// Updated jobs data service using Supabase
import { DatabaseService, Job, JobPromptStructure } from '@/lib/database/supabase'

export interface JobWithPrompts extends Job {
  promptStructures?: JobPromptStructure[]
}

export async function getJobById(id: string): Promise<JobWithPrompts | null> {
  try {
    const job = await DatabaseService.getJobById(id)
    if (!job) return null

    const promptStructures = await DatabaseService.getJobPromptStructures(id)
    
    return {
      ...job,
      promptStructures
    }
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function getFeaturedJobs(limit = 3): Promise<Job[]> {
  try {
    return await DatabaseService.getFeaturedJobs(limit)
  } catch (error) {
    console.error('Error fetching featured jobs:', error)
    return []
  }
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    return await DatabaseService.getAllJobs()
  } catch (error) {
    console.error('Error fetching all jobs:', error)
    return []
  }
}