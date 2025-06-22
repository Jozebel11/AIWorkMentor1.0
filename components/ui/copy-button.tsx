"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-4 shrink-0"
      onClick={handleCopy}
    >
      <Copy className="h-4 w-4 mr-1" />
      Copy
    </Button>
  )
}