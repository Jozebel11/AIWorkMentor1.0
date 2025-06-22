"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { SearchBar } from "@/components/ui/search-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/ui/job-card"
import { ToolCard } from "@/components/ui/tool-card"
import { UseCaseCard } from "@/components/ui/use-case-card"
import { getAllJobs } from "@/lib/data/jobs"
import { getAllTools } from "@/lib/data/tools"
import { getUseCasesByJobId } from "@/lib/data/use-cases"
import type { Job, Tool, UseCase } from "@/lib/database/supabase"

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchValue, setSearchValue] = useState(query)
  const [activeTab, setActiveTab] = useState("all")
  const [jobs, setJobs] = useState<Job[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [useCases, setUseCases] = useState<UseCase[]>([])
  const [loading, setLoading] = useState(true)

  // Update search value when URL changes
  useEffect(() => {
    setSearchValue(query)
  }, [query])

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobsData, toolsData] = await Promise.all([
          getAllJobs(),
          getAllTools()
        ])

        setJobs(jobsData)
        setTools(toolsData)

        // Load use cases for all jobs
        const allUseCases: UseCase[] = []
        for (const job of jobsData) {
          const jobUseCases = await getUseCasesByJobId(job.id)
          allUseCases.push(...jobUseCases)
        }
        setUseCases(allUseCases)
      } catch (error) {
        console.error('Error loading search data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter based on search query
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase()) ||
    job.description.toLowerCase().includes(query.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase()) ||
    tool.category.toLowerCase().includes(query.toLowerCase())
  )

  const filteredUseCases = useCases.filter(useCase =>
    useCase.title.toLowerCase().includes(query.toLowerCase()) ||
    useCase.description.toLowerCase().includes(query.toLowerCase())
  )

  // Calculate total results
  const totalResults = filteredJobs.length + filteredTools.length + filteredUseCases.length

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    } else {
      router.push('/search')
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search</h1>
        <p className="mt-2 text-muted-foreground">
          Loading search data...
        </p>

        <div className="mt-6 max-w-md">
          <SearchBar
            placeholder="Search jobs, tools, or use cases..."
            value={searchValue}
            onChange={handleSearch}
            fullWidth
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg border bg-muted h-48"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search</h1>
        <p className="mt-2 text-muted-foreground">
          Search for jobs, tools, and use cases to enhance your productivity with AI.
        </p>

        <div className="mt-6 max-w-md">
          <SearchBar
            placeholder="Search jobs, tools, or use cases..."
            value={searchValue}
            onChange={handleSearch}
            fullWidth
          />
        </div>

        <div className="mt-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold">Start your search</h2>
          <p className="mt-2 text-muted-foreground">
            Enter a keyword to find relevant jobs, tools, and use cases
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search Results</h1>
      <p className="mt-2 text-muted-foreground">
        {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
      </p>

      {/* Search bar for refining search */}
      <div className="mt-6 max-w-md">
        <SearchBar
          placeholder="Refine your search..."
          value={searchValue}
          onChange={handleSearch}
          fullWidth
        />
      </div>

      {/* Tabs for filtering results by type */}
      <div className="mt-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">
              All Results ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="jobs">
              Jobs ({filteredJobs.length})
            </TabsTrigger>
            <TabsTrigger value="tools">
              Tools ({filteredTools.length})
            </TabsTrigger>
            <TabsTrigger value="usecases">
              Use Cases ({filteredUseCases.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {totalResults > 0 ? (
              <div className="space-y-10">
                {filteredJobs.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Jobs</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredJobs.slice(0, 3).map((job) => (
                        <JobCard
                          key={job.id}
                          id={job.id}
                          title={job.title}
                          description={job.description}
                          useCaseCount={job.use_case_count}
                          image={job.image}
                          tags={job.tags}
                        />
                      ))}
                    </div>
                    {filteredJobs.length > 3 && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setActiveTab("jobs")}
                          className="text-sm text-primary hover:underline"
                        >
                          Show all {filteredJobs.length} jobs
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {filteredTools.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Tools</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredTools.slice(0, 3).map((tool) => (
                        <ToolCard
                          key={tool.id}
                          id={tool.id}
                          name={tool.name}
                          description={tool.description}
                          image={tool.image}
                          category={tool.category}
                          url={tool.url}
                        />
                      ))}
                    </div>
                    {filteredTools.length > 3 && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setActiveTab("tools")}
                          className="text-sm text-primary hover:underline"
                        >
                          Show all {filteredTools.length} tools
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {filteredUseCases.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Use Cases</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredUseCases.slice(0, 3).map((useCase) => (
                        <UseCaseCard
                          key={useCase.id}
                          id={useCase.id}
                          jobId={useCase.job_id}
                          title={useCase.title}
                          description={useCase.description}
                          difficulty={useCase.difficulty}
                          timeEstimate={useCase.time_estimate}
                          tools={useCase.tools}
                        />
                      ))}
                    </div>
                    {filteredUseCases.length > 3 && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setActiveTab("usecases")}
                          className="text-sm text-primary hover:underline"
                        >
                          Show all {filteredUseCases.length} use cases
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold">No results found</h2>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or browse our categories instead
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <a href="/jobs" className="text-primary hover:underline">Browse Jobs</a>
                  <a href="/tools" className="text-primary hover:underline">Browse Tools</a>
                  <a href="/glossary" className="text-primary hover:underline">Browse Glossary</a>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    description={job.description}
                    useCaseCount={job.use_case_count}
                    image={job.image}
                    tags={job.tags}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No job matches found.</p>
            )}
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            {filteredTools.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    id={tool.id}
                    name={tool.name}
                    description={tool.description}
                    image={tool.image}
                    category={tool.category}
                    url={tool.url}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No tool matches found.</p>
            )}
          </TabsContent>

          <TabsContent value="usecases" className="mt-6">
            {filteredUseCases.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUseCases.map((useCase) => (
                  <UseCaseCard
                    key={useCase.id}
                    id={useCase.id}
                    jobId={useCase.job_id}
                    title={useCase.title}
                    description={useCase.description}
                    difficulty={useCase.difficulty}
                    timeEstimate={useCase.time_estimate}
                    tools={useCase.tools}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No use case matches found.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="h-4 bg-muted rounded w-64 mb-8"></div>
          <div className="h-10 bg-muted rounded w-80"></div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}