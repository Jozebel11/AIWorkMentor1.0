import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface ToolCardProps {
  id: string
  name: string
  description: string
  image: string
  category: string
  url: string
}

export function ToolCard({ id, name, description, image, category, url }: ToolCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="outline">{category}</Badge>
        </div>
        <CardDescription>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Visit website
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <Link 
          href={`/tools/${id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View details
        </Link>
      </CardContent>
    </Card>
  )
}