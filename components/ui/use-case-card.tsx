import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface UseCaseCardProps {
  id: string
  jobId: string
  title: string
  description: string
  difficulty: string
  timeEstimate: string
  tools: string[]
}

export function UseCaseCard({ 
  id, 
  jobId, 
  title, 
  description, 
  difficulty, 
  timeEstimate, 
  tools 
}: UseCaseCardProps) {
  return (
    <Link href={`/jobs/${jobId}/${id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge 
              className={
                difficulty === "Beginner" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }
            >
              {difficulty}
            </Badge>
          </div>
          <CardDescription className="flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-xs">{timeEstimate}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.slice(0, 3).map((tool) => (
              <Badge key={tool} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
            {tools.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tools.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}