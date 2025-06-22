import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CheckCircle, ArrowRight, Lightbulb, Target, Zap, Shield } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Getting Started with AI Tools - AI Productivity",
  description: "A comprehensive beginner's guide to using AI tools effectively for productivity and professional growth.",
}

export default function GettingStartedPage() {
  const steps = [
    {
      number: 1,
      title: "Understand What AI Can Do",
      description: "Learn the capabilities and limitations of different AI tools",
      content: [
        "AI excels at pattern recognition, text generation, and data analysis",
        "Current AI tools are best for assistance, not replacement of human judgment",
        "Different tools have different strengths (writing, coding, image generation, etc.)",
        "AI works best when given clear, specific instructions"
      ]
    },
    {
      number: 2,
      title: "Choose the Right Tools",
      description: "Select AI tools that match your specific needs and workflow",
      content: [
        "Start with one or two tools rather than trying everything at once",
        "Consider your primary use cases (writing, coding, design, research)",
        "Evaluate free vs. paid options based on your usage needs",
        "Check if tools integrate with your existing software"
      ]
    },
    {
      number: 3,
      title: "Learn Effective Prompting",
      description: "Master the art of communicating with AI tools",
      content: [
        "Be specific and clear in your requests",
        "Provide context and examples when possible",
        "Break complex tasks into smaller, manageable steps",
        "Iterate and refine your prompts based on results"
      ]
    },
    {
      number: 4,
      title: "Start Small and Scale",
      description: "Begin with simple tasks and gradually increase complexity",
      content: [
        "Start with low-stakes tasks to build confidence",
        "Practice with different types of prompts and requests",
        "Document what works well for future reference",
        "Gradually incorporate AI into more critical workflows"
      ]
    },
    {
      number: 5,
      title: "Develop Good Habits",
      description: "Establish sustainable practices for long-term success",
      content: [
        "Always verify important information from AI outputs",
        "Maintain your critical thinking and domain expertise",
        "Keep learning about new features and capabilities",
        "Share knowledge and best practices with colleagues"
      ]
    }
  ]

  const quickTips = [
    {
      icon: Lightbulb,
      title: "Be Specific",
      description: "The more specific your request, the better the AI can help you."
    },
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Define what success looks like before starting any AI-assisted task."
    },
    {
      icon: Zap,
      title: "Iterate Quickly",
      description: "Don't expect perfect results on the first try. Refine and improve."
    },
    {
      icon: Shield,
      title: "Verify Results",
      description: "Always double-check important information and outputs."
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Getting Started", href: "/resources/getting-started", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Getting Started with AI Tools
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your complete guide to using AI tools effectively and responsibly
          </p>
          <Badge variant="secondary" className="mt-4">
            Beginner Friendly
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to the Future of Productivity</CardTitle>
            <CardDescription>
              AI tools are transforming how we work, learn, and create. This guide will help you harness their power effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Whether you're a complete beginner or looking to improve your AI tool usage, this guide provides 
              practical steps to get started safely and effectively. We'll cover everything from choosing the 
              right tools to developing good habits that will serve you long-term.
            </p>
          </CardContent>
        </Card>

        {/* Step-by-step guide */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold">Step-by-Step Guide</h2>
          
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {step.number}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Tips for Success</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quickTips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <tip.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription>
              Now that you understand the basics, explore these resources to continue your AI journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link href="/jobs">
                  <span className="font-medium mb-1">Find Your Job</span>
                  <span className="text-xs text-muted-foreground">Discover AI use cases for your profession</span>
                  <ArrowRight className="h-4 w-4 mt-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link href="/tools">
                  <span className="font-medium mb-1">Explore Tools</span>
                  <span className="text-xs text-muted-foreground">Browse our curated AI tool directory</span>
                  <ArrowRight className="h-4 w-4 mt-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link href="/resources/best-practices">
                  <span className="font-medium mb-1">Best Practices</span>
                  <span className="text-xs text-muted-foreground">Learn advanced techniques and strategies</span>
                  <ArrowRight className="h-4 w-4 mt-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}