"use client"

import { useState, useEffect } from "react"
import { getAllTools } from "@/lib/data/tools"
import { ToolCard } from "@/components/ui/tool-card"
import { SearchBar } from "@/components/ui/search-bar"
import type { Tool } from "@/lib/database/supabase"

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [allTools, setAllTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTools = async () => {
      try {
        const tools = await getAllTools()
        setAllTools(tools)
      } catch (error) {
        console.error('Error loading tools:', error)
        setAllTools([])
      } finally {
        setLoading(false)
      }
    }

    loadTools()
  }, [])

  // Get unique categories for filtering
  const categories = [...new Set(allTools.map(tool => tool.category))]

  // Filter tools based on search query and category
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Tools Directory
          </h1>
          <p className="mt-4 text-muted-foreground">
            Discover powerful AI tools that can transform your workflow and boost your productivity
          </p>
          <div className="mt-6">
            <SearchBar
              placeholder="Search tools by name or category..."
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
              <div className="rounded-lg border bg-muted h-48"></div>
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
          AI Tools Directory
        </h1>
        <p className="mt-4 text-muted-foreground">
          Discover powerful AI tools that can transform your workflow and boost your productivity
        </p>
        <div className="mt-6">
          <SearchBar
            placeholder="Search tools by name or category..."
            className="mx-auto"
            fullWidth
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {(searchQuery || selectedCategory !== "all") && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            {filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>
      )}

      {/* Tools grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {filteredTools.length === 0 && (searchQuery || selectedCategory !== "all") && (
        <div className="mt-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold">No tools found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or browse all available tools
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline"
              >
                Clear search
              </button>
            )}
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-primary hover:underline"
              >
                Show all categories
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}