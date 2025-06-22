'use client'

import { useEffect, useState } from 'react'
import { getAllTools } from "@/lib/data/tools"
import { ToolCard } from "@/components/ui/tool-card"
import type { Tool } from "@/lib/database/supabase"

export function FeaturedTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTools = async () => {
      try {
        const allTools = await getAllTools()
        // Just take the first 3 tools for featured section
        setTools(allTools.slice(0, 3))
      } catch (error) {
        console.error('Error loading tools:', error)
        setTools([])
      } finally {
        setLoading(false)
      }
    }

    loadTools()
  }, [])

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Essential AI Tools</h2>
            <p className="mt-2 text-muted-foreground">
              Powerful AI tools to boost your productivity
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg border bg-background h-48"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (tools.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Essential AI Tools</h2>
          <p className="mt-2 text-muted-foreground">
            Powerful AI tools to boost your productivity
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
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

        <div className="mt-8 text-center">
          <a
            href="/tools"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Explore All Tools
          </a>
        </div>
      </div>
    </section>
  )
}