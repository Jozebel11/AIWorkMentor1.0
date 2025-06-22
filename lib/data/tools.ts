// Updated tools data service using Supabase
import { DatabaseService, Tool } from '@/lib/database/supabase'

export async function getToolById(id: string): Promise<Tool | null> {
  try {
    return await DatabaseService.getToolById(id)
  } catch (error) {
    console.error('Error fetching tool:', error)
    return null
  }
}

export async function getAllTools(): Promise<Tool[]> {
  try {
    return await DatabaseService.getAllTools()
  } catch (error) {
    console.error('Error fetching all tools:', error)
    return []
  }
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  try {
    return await DatabaseService.getToolsByCategory(category)
  } catch (error) {
    console.error('Error fetching tools by category:', error)
    return []
  }
}