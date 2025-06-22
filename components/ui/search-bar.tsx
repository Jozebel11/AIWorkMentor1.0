"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  fullWidth?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function SearchBar({ 
  placeholder = "Search...", 
  className, 
  fullWidth = false,
  value: controlledValue,
  onChange
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("")
  const router = useRouter()
  
  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const setValue = onChange || setInternalValue

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", fullWidth ? "w-full" : "w-64", className)}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="pl-8"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1 h-7 px-2"
          variant="ghost"
        >
          <Search className="h-3 w-3" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}