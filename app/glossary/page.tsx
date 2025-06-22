"use client"

import { useState, useEffect } from "react"
import { getAllGlossaryTerms, getGlossaryCategories } from "@/lib/data/glossary"
import { SearchBar } from "@/components/ui/search-bar"
import { Badge } from "@/components/ui/badge"
import type { GlossaryTerm } from "@/lib/database/supabase"

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [allTerms, setAllTerms] = useState<GlossaryTerm[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadGlossaryData = async () => {
      try {
        const [terms, cats] = await Promise.all([
          getAllGlossaryTerms(),
          getGlossaryCategories()
        ])
        setAllTerms(terms)
        setCategories(cats)
      } catch (error) {
        console.error('Error loading glossary data:', error)
        setAllTerms([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadGlossaryData()
  }, [])
  
  // Filter terms based on search query and category
  const filteredTerms = allTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Glossary
          </h1>
          <p className="mt-4 text-muted-foreground">
            Master AI terminology and concepts to communicate confidently about artificial intelligence
          </p>
          <div className="mt-6">
            <SearchBar 
              placeholder="Search terms..." 
              className="mx-auto" 
              fullWidth 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
        
        <div className="mt-12">
          <div className="grid gap-8 md:grid-cols-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-lg border bg-muted h-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          AI Glossary
        </h1>
        <p className="mt-4 text-muted-foreground">
          Master AI terminology and concepts to communicate confidently about artificial intelligence
        </p>
        <div className="mt-6">
          <SearchBar 
            placeholder="Search terms..." 
            className="mx-auto" 
            fullWidth 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button 
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedCategory === "all" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All Terms
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === category 
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
            {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} 
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>
      )}
      
      {/* Glossary terms */}
      <div className="mt-12">
        <div className="grid gap-8 md:grid-cols-2">
          {filteredTerms.map((term) => (
            <div key={term.id} className="group rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-sm">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg font-bold">{term.term}</h3>
                <Badge variant="outline">{term.category}</Badge>
              </div>
              <p className="text-muted-foreground">{term.definition}</p>
            </div>
          ))}
        </div>
      </div>
      
      {filteredTerms.length === 0 && (searchQuery || selectedCategory !== "all") && (
        <div className="mt-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold">No terms found</h2>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or browse all available terms
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
      
      {/* Resources section */}
      <div className="mt-16 rounded-lg bg-muted p-6 md:p-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <h3 className="text-xl font-bold">Ready to Apply Your Knowledge?</h3>
            <p className="mt-1 text-muted-foreground">
              Now that you understand the terminology, start using AI tools in your profession.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/jobs"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Find Your Profession
            </a>
            <a
              href="/resources/getting-started"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Start Learning AI
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}