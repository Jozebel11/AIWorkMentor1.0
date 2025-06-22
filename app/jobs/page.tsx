"use client"

import { useState, useEffect } from "react"
import { getAllJobs } from "@/lib/data/jobs"
import { JobCard } from "@/components/ui/job-card"
import { SearchBar } from "@/components/ui/search-bar"
import type { Job } from "@/lib/database/supabase"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await getAllJobs()
        setAllJobs(jobs)
      } catch (error) {
        console.error('Error loading jobs:', error)
        setAllJobs([])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])
  
  // Filter jobs based on search query
  const filteredJobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Find AI Solutions For Your Profession
          </h1>
          <p className="mt-4 text-muted-foreground">
            Discover how AI can enhance productivity and accelerate career growth in your specific field
          </p>
          <div className="mt-6">
            <SearchBar 
              placeholder="Search jobs or industries..." 
              className="mx-auto" 
              fullWidth 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg border bg-muted h-64"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Find AI Solutions For Your Profession
        </h1>
        <p className="mt-4 text-muted-foreground">
          Discover how AI can enhance productivity and accelerate career growth in your specific field
        </p>
        <div className="mt-6">
          <SearchBar 
            placeholder="Search jobs or industries..." 
            className="mx-auto" 
            fullWidth 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>
      
      {searchQuery && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}
      
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            description={job.description}
            useCaseCount={job.use_case_count}
            image={job.image}
            tags={job.tags}
            featured={job.featured}
          />
        ))}
      </div>
      
      {filteredJobs.length === 0 && searchQuery && (
        <div className="mt-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold">No jobs found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or browse all available jobs
          </p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-4 text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
      
      <div className="mt-16 rounded-lg bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <h3 className="text-xl font-bold">Don't see your profession?</h3>
            <p className="mt-1 text-muted-foreground">
              We're constantly adding new job categories and AI use cases to help more professionals thrive.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:hello@thrivewith.ai?subject=Request%20New%20Job%20Category"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Request a Job Category
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}