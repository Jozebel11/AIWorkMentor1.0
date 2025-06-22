import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JobCardProps {
  id: string
  title: string
  description: string
  useCaseCount: number
  image: string
  tags: string[]
  featured?: boolean
}

export function JobCard({ id, title, description, useCaseCount, image, tags, featured }: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <Card className={`h-full overflow-hidden transition-all hover:shadow-md ${featured ? 'border-primary/50' : ''}`}>
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {useCaseCount} AI use case{useCaseCount !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}