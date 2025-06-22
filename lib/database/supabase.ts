import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Job {
  id: string
  title: string
  description: string
  image: string
  use_case_count: number
  tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface JobPromptStructure {
  id: string
  job_id: string
  title: string
  description: string
  example: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Tool {
  id: string
  name: string
  description: string
  long_description?: string
  image: string
  category: string
  url: string
  pros: string[]
  cons: string[]
  use_cases: string[]
  created_at: string
  updated_at: string
}

export interface UseCase {
  id: string
  job_id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  time_estimate: string
  tools: string[]
  steps: Array<{
    title: string
    content: string
  }>
  created_at: string
  updated_at: string
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: string
  created_at: string
  updated_at: string
}

// Database service functions
export class DatabaseService {
  // Jobs
  static async getAllJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('title')
    
    if (error) throw error
    return data || []
  }

  static async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  }

  static async getFeaturedJobs(limit = 3): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('featured', true)
      .limit(limit)
    
    if (error) throw error
    return data || []
  }

  static async getJobPromptStructures(jobId: string): Promise<JobPromptStructure[]> {
    const { data, error } = await supabase
      .from('job_prompt_structures')
      .select('*')
      .eq('job_id', jobId)
      .order('order_index')
    
    if (error) throw error
    return data || []
  }

  // Tools
  static async getAllTools(): Promise<Tool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  }

  static async getToolById(id: string): Promise<Tool | null> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  }

  static async getToolsByCategory(category: string): Promise<Tool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category', category)
      .order('name')
    
    if (error) throw error
    return data || []
  }

  // Use Cases
  static async getUseCasesByJobId(jobId: string): Promise<UseCase[]> {
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .eq('job_id', jobId)
      .order('title')
    
    if (error) throw error
    return data || []
  }

  static async getUseCaseByJobAndId(jobId: string, useCaseId: string): Promise<UseCase | null> {
    const { data, error } = await supabase
      .from('use_cases')
      .select('*')
      .eq('job_id', jobId)
      .eq('id', useCaseId)
      .single()
    
    if (error) return null
    return data
  }

  // Glossary
  static async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .order('term')
    
    if (error) throw error
    return data || []
  }

  static async getGlossaryTermsByCategory(category: string): Promise<GlossaryTerm[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('category', category)
      .order('term')
    
    if (error) throw error
    return data || []
  }

  static async getGlossaryCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('glossary_terms')
      .select('category')
      .order('category')
    
    if (error) throw error
    
    const categories = [...new Set(data?.map(item => item.category) || [])]
    return categories
  }

  // Search functionality
  static async searchContent(query: string): Promise<{
    jobs: Job[]
    tools: Tool[]
    useCases: UseCase[]
    glossaryTerms: GlossaryTerm[]
  }> {
    const searchTerm = query.trim()
    
    if (!searchTerm) {
      return { jobs: [], tools: [], useCases: [], glossaryTerms: [] }
    }

    // Search jobs
    const { data: jobs } = await supabase
      .from('jobs')
      .select('*')
      .textSearch('title,description', searchTerm)
      .limit(10)

    // Search tools
    const { data: tools } = await supabase
      .from('tools')
      .select('*')
      .textSearch('name,description', searchTerm)
      .limit(10)

    // Search use cases
    const { data: useCases } = await supabase
      .from('use_cases')
      .select('*')
      .textSearch('title,description', searchTerm)
      .limit(10)

    // Search glossary terms
    const { data: glossaryTerms } = await supabase
      .from('glossary_terms')
      .select('*')
      .textSearch('term,definition', searchTerm)
      .limit(10)

    return {
      jobs: jobs || [],
      tools: tools || [],
      useCases: useCases || [],
      glossaryTerms: glossaryTerms || []
    }
  }
}