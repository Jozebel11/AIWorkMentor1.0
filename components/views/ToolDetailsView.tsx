import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ExternalLink, CheckCircle, XCircle } from "lucide-react"
import type { Tool } from "@/lib/data/tools"

interface ToolDetailsViewProps {
  tool: Tool
  relatedTools: Tool[]
}

export default function ToolDetailsView({ tool, relatedTools }: ToolDetailsViewProps) {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name, href: `/tools/${tool.id}`, current: true }
        ]}
        className="mb-6"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div>
            <Badge variant="outline">{tool.category}</Badge>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{tool.name}</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {tool.description}
            </p>
          </div>

          <div className="relative mt-6 h-64 w-full overflow-hidden rounded-lg md:h-80">
            <Image
              src={tool.image}
              alt={tool.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {tool.longDescription && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold">About {tool.name}</h2>
              <p className="mt-4">{tool.longDescription}</p>
            </section>
          )}

          {/* Pros and Cons */}
          <section className="mt-8 grid gap-6 md:grid-cols-2">
            {tool.pros && tool.pros.length > 0 && (
              <div className="rounded-lg border border-border p-6">
                <h2 className="flex items-center text-xl font-bold text-green-600 dark:text-green-400">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Pros
                </h2>
                <ul className="mt-4 space-y-2">
                  {tool.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.cons && tool.cons.length > 0 && (
              <div className="rounded-lg border border-border p-6">
                <h2 className="flex items-center text-xl font-bold text-red-600 dark:text-red-400">
                  <XCircle className="mr-2 h-5 w-5" />
                  Cons
                </h2>
                <ul className="mt-4 space-y-2">
                  {tool.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <XCircle className="mr-2 mt-0.5 h-4 w-4 text-red-600 dark:text-red-400" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Common Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold">Common Use Cases</h2>
              <ul className="mt-4 space-y-2">
                {tool.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-3">
                      {index + 1}
                    </div>
                    {useCase}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-bold">Tool Information</h2>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{tool.category}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Official Website</h3>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  Visit Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div className="pt-4">
                <Button className="w-full" asChild>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Try {tool.name} Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {relatedTools.length > 0 && (
              <div className="mt-6 rounded-lg bg-muted p-4">
                <h3 className="font-medium">Related Tools</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {relatedTools.map(relatedTool => (
                    <li key={relatedTool.id}>
                      <a
                        href={`/tools/${relatedTool.id}`}
                        className="text-primary hover:underline"
                      >
                        {relatedTool.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}