import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Shield, CheckCircle, HelpCircle, FileText, Scale, Eye, AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Resources - AI Productivity",
  description: "Access comprehensive guides, best practices, and essential information for using AI tools effectively and responsibly.",
}

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Learning & Guides",
      description: "Essential resources to get started and master AI tools",
      icon: BookOpen,
      resources: [
        {
          title: "Getting Started",
          description: "Complete beginner's guide to AI productivity tools",
          href: "/resources/getting-started",
          color: "bg-blue-500"
        },
        {
          title: "Best Practices",
          description: "Proven strategies for effective AI tool usage",
          href: "/resources/best-practices",
          color: "bg-green-500"
        }
      ]
    },
    {
      title: "Ethics & Responsibility",
      description: "Guidelines for responsible AI usage",
      icon: Shield,
      resources: [
        {
          title: "AI Ethics",
          description: "Ethical considerations when using AI tools",
          href: "/resources/ai-ethics",
          color: "bg-purple-500"
        }
      ]
    },
    {
      title: "Support & Help",
      description: "Get answers to common questions",
      icon: HelpCircle,
      resources: [
        {
          title: "FAQ",
          description: "Frequently asked questions and answers",
          href: "/resources/faq",
          color: "bg-orange-500"
        }
      ]
    },
    {
      title: "Legal Information",
      description: "Important legal documents and policies",
      icon: Scale,
      resources: [
        {
          title: "Privacy Policy",
          description: "How we handle your personal information",
          href: "/legal/privacy-policy",
          color: "bg-gray-500"
        },
        {
          title: "Terms of Service",
          description: "Terms and conditions for using our platform",
          href: "/legal/terms-of-service",
          color: "bg-gray-600"
        },
        {
          title: "Disclaimer",
          description: "Important disclaimers and limitations",
          href: "/legal/disclaimer",
          color: "bg-gray-700"
        }
      ]
    }
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Resources
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Everything you need to use AI tools effectively and responsibly
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="h-fit">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <Link
                      key={resourceIndex}
                      href={resource.href}
                      className="block rounded-lg border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${resource.color}`} />
                        <div className="flex-1">
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 rounded-lg bg-muted p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link href="/jobs">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="font-medium">Browse Jobs</span>
                <span className="text-xs text-muted-foreground">Find AI use cases for your profession</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link href="/tools">
                <CheckCircle className="h-6 w-6 mb-2" />
                <span className="font-medium">Explore Tools</span>
                <span className="text-xs text-muted-foreground">Discover AI productivity tools</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link href="/glossary">
                <FileText className="h-6 w-6 mb-2" />
                <span className="font-medium">AI Glossary</span>
                <span className="text-xs text-muted-foreground">Learn AI terminology</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col">
              <Link href="/search">
                <HelpCircle className="h-6 w-6 mb-2" />
                <span className="font-medium">Search</span>
                <span className="text-xs text-muted-foreground">Find specific content</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}