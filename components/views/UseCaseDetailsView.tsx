import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Sidebar } from "@/components/layout/Sidebar"
import { Clock } from "lucide-react"
import Link from "next/link"
import type { Job, UseCase, Tool } from "@/lib/database/supabase"

interface UseCaseDetailsViewProps {
  job: Job
  useCase: UseCase
  tools: Tool[]
  sidebarItems: Array<{
    title: string
    href: string
  }>
}

export default function UseCaseDetailsView({ job, useCase, tools, sidebarItems }: UseCaseDetailsViewProps) {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Jobs", href: "/jobs" },
          { label: job.title, href: `/jobs/${job.id}` },
          { label: useCase.title, href: `/jobs/${job.id}/${useCase.id}`, current: true }
        ]}
        className="mb-6"
      />
      
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar - visible on larger screens */}
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-20">
            <Sidebar items={sidebarItems} />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
              ${useCase.difficulty === "Beginner" 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : useCase.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {useCase.difficulty}
            </span>
            <span className="ml-2 inline-flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {useCase.time_estimate}
            </span>
          </div>
          
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {useCase.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {useCase.description}
          </p>
          
          {/* Overview section */}
          <section id="overview" className="mt-10">
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-4">
              This guide will walk you through how to use AI tools effectively for {useCase.title.toLowerCase()}. 
              Whether you're new to AI or looking to enhance your existing workflow, follow these steps to improve 
              your productivity as a {job.title.toLowerCase()}.
            </p>
          </section>
          
          {/* Tools section */}
          <section id="tools" className="mt-10">
            <h2 className="text-2xl font-bold">Required Tools</h2>
            <div className="mt-4 space-y-4">
              {tools.map(tool => (
                <div key={tool.id} className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link
                      href={`/tools/${tool.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Learn more about {tool.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Steps section */}
          {useCase.steps && useCase.steps.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold">Step-by-Step Guide</h2>
              <ol className="mt-6 space-y-8">
                {useCase.steps.map((step, index) => (
                  <li 
                    key={index} 
                    id={`step-${index + 1}`}
                    className="relative pl-10"
                  >
                    <span className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-medium">{step.title}</h3>
                    <p className="mt-2">{step.content}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
          
          {/* Next steps section */}
          <section id="next-steps" className="mt-10">
            <h2 className="text-2xl font-bold">Next Steps</h2>
            <p className="mt-4">
              Now that you've learned how to use AI for {useCase.title.toLowerCase()}, you can continue to refine your skills and explore other use cases relevant to your role as a {job.title.toLowerCase()}.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Explore Related Use Cases</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Discover more ways to use AI in your profession
                </p>
                <div className="mt-3">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Back to {job.title} use cases
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Learn About AI Tools</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Understand the capabilities of different AI tools
                </p>
                <div className="mt-3">
                  <Link
                    href="/tools"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Browse AI tools
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}