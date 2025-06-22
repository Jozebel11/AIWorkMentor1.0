// Updated glossary data service using Supabase
import { DatabaseService, GlossaryTerm } from '@/lib/database/supabase'

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    return await DatabaseService.getAllGlossaryTerms()
  } catch (error) {
    console.error('Error fetching glossary terms:', error)
    return []
  }
}

export async function getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
  try {
    return await DatabaseService.getGlossaryTermsByCategory(category)
  } catch (error) {
    console.error('Error fetching glossary terms by category:', error)
    return []
  }
}

export async function getGlossaryCategories(): Promise<string[]> {
  try {
    return await DatabaseService.getGlossaryCategories()
  } catch (error) {
    console.error('Error fetching glossary categories:', error)
    return []
  }
}