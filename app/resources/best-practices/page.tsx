import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Target, Zap, Shield, Users, TrendingUp, CheckCircle } from "lucide-react"

export const metadata = {
  title: "AI Best Practices - AI Productivity",
  description: "Proven strategies and techniques for maximizing productivity and effectiveness with AI tools.",
}

export default function BestPracticesPage() {
  const practiceCategories = [
    {
      icon: Target,
      title: "Effective Prompting",
      description: "Master the art of communicating with AI",
      practices: [
        {
          title: "Be Specific and Clear",
          description: "Provide detailed context and clear instructions",
          example: "Instead of 'Write about marketing,' try 'Write a 500-word blog post about email marketing best practices for small businesses, focusing on subject lines and segmentation.'"
        },
        {
          title: "Use Examples",
          description: "Show the AI what you want with concrete examples",
          example: "When asking for a format, provide a sample: 'Format the response like this example: [provide sample format]'"
        },
        {
          title: "Break Down Complex Tasks",
          description: "Divide large requests into smaller, manageable steps",
          example: "Instead of asking for a complete business plan, ask for individual sections: executive summary, market analysis, etc."
        },
        {
          title: "Iterate and Refine",
          description: "Use follow-up prompts to improve results",
          example: "'Make it more concise,' 'Add more technical details,' or 'Adjust the tone to be more professional'"
        }
      ]
    },
    {
      icon: Zap,
      title: "Workflow Integration",
      description: "Seamlessly incorporate AI into your daily work",
      practices: [
        {
          title: "Start with Low-Stakes Tasks",
          description: "Begin with tasks where errors have minimal consequences",
          example: "Use AI for brainstorming ideas, drafting initial outlines, or generating multiple options to choose from"
        },
        {
          title: "Create Templates and Prompts",
          description: "Develop reusable prompts for common tasks",
          example: "Save effective prompts for recurring tasks like meeting summaries, email responses, or content outlines"
        },
        {
          title: "Establish Review Processes",
          description: "Build in human review steps for AI-assisted work",
          example: "Always review AI-generated content for accuracy, tone, and alignment with your goals before using it"
        },
        {
          title: "Track What Works",
          description: "Document successful approaches for future use",
          example: "Keep a log of effective prompts, useful tools, and successful workflows"
        }
      ]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Ensure high-quality, reliable outputs",
      practices: [
        {
          title: "Fact-Check Everything",
          description: "Verify all factual claims and statistics",
          example: "Cross-reference AI-provided data with authoritative sources, especially for important decisions"
        },
        {
          title: "Test Different Approaches",
          description: "Try multiple prompts or tools for important tasks",
          example: "Generate several versions of important content and compare quality, accuracy, and effectiveness"
        },
        {
          title: "Understand Tool Limitations",
          description: "Know what each AI tool can and cannot do well",
          example: "Use language models for text, image generators for visuals, and specialized tools for specific domains"
        },
        {
          title: "Maintain Human Oversight",
          description: "Keep humans in the loop for critical decisions",
          example: "Use AI for analysis and recommendations, but make final decisions based on human judgment"
        }
      ]
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Work effectively with AI and human team members",
      practices: [
        {
          title: "Share Knowledge",
          description: "Document and share effective AI practices with your team",
          example: "Create a shared repository of useful prompts, tools, and workflows for your organization"
        },
        {
          title: "Set Team Standards",
          description: "Establish guidelines for AI usage in collaborative work",
          example: "Agree on when to disclose AI assistance, quality standards, and review processes"
        },
        {
          title: "Train and Support Others",
          description: "Help colleagues learn effective AI usage",
          example: "Conduct workshops, share resources, and provide mentoring on AI tool usage"
        },
        {
          title: "Respect Different Comfort Levels",
          description: "Accommodate varying levels of AI adoption",
          example: "Provide alternatives for team members who prefer traditional methods while encouraging exploration"
        }
      ]
    }
  ]

  const commonMistakes = [
    {
      mistake: "Over-relying on AI without verification",
      solution: "Always fact-check and review AI outputs, especially for important work"
    },
    {
      mistake: "Using vague or unclear prompts",
      solution: "Be specific about what you want, including format, length, and style"
    },
    {
      mistake: "Not iterating on initial results",
      solution: "Use follow-up prompts to refine and improve AI outputs"
    },
    {
      mistake: "Ignoring AI tool limitations",
      solution: "Understand what each tool does well and where it struggles"
    },
    {
      mistake: "Not maintaining human expertise",
      solution: "Continue developing your own skills and knowledge alongside AI usage"
    }
  ]

  const advancedTips = [
    {
      title: "Chain Prompts for Complex Tasks",
      description: "Break complex workflows into a series of connected prompts",
      example: "Research → Outline → Draft → Edit → Finalize, with AI assistance at each step"
    },
    {
      title: "Use Role-Playing Prompts",
      description: "Ask AI to take on specific roles or perspectives",
      example: "'Act as a marketing expert and review this campaign strategy' or 'Respond as a customer would'"
    },
    {
      title: "Leverage AI for Meta-Tasks",
      description: "Use AI to help you use AI better",
      example: "Ask AI to help you write better prompts or suggest workflow improvements"
    },
    {
      title: "Combine Multiple AI Tools",
      description: "Use different tools for different parts of a workflow",
      example: "Use ChatGPT for text, DALL-E for images, and specialized tools for data analysis"
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Best Practices", href: "/resources/best-practices", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Best Practices
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Proven strategies for maximizing AI tool effectiveness
          </p>
          <Badge variant="secondary" className="mt-4">
            Intermediate to Advanced
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Maximize Your AI Productivity</CardTitle>
            <CardDescription>
              Learn from the experiences of successful AI users across different professions and use cases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These best practices have been gathered from extensive research and real-world experience. 
              They'll help you avoid common pitfalls, work more efficiently, and achieve better results 
              with AI tools. Whether you're just getting started or looking to optimize your existing workflows, 
              these strategies will enhance your AI productivity.
            </p>
          </CardContent>
        </Card>

        {/* Practice Categories */}
        <div className="space-y-12 mb-12">
          {practiceCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {category.practices.map((practice, practiceIndex) => (
                  <Card key={practiceIndex}>
                    <CardHeader>
                      <CardTitle className="text-lg">{practice.title}</CardTitle>
                      <CardDescription>{practice.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md bg-muted p-4">
                        <p className="text-sm font-medium mb-2">Example:</p>
                        <p className="text-sm text-muted-foreground italic">{practice.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Mistakes to Avoid</h2>
          <div className="space-y-4">
            {commonMistakes.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/20">
                      <span className="text-red-600 font-bold text-sm">✗</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-600 mb-2">{item.mistake}</h3>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Advanced Techniques</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {advancedTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {tip.title}
                  </CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm font-medium mb-2">Example:</p>
                    <p className="text-sm text-muted-foreground italic">{tip.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Key Takeaways</CardTitle>
            <CardDescription>
              Remember these essential principles for successful AI usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="rounded-lg bg-blue-100 p-3 w-fit mx-auto mb-3 dark:bg-blue-900/20">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Be Intentional</h3>
                <p className="text-sm text-muted-foreground">Use AI with clear goals and specific instructions</p>
              </div>
              <div className="text-center">
                <div className="rounded-lg bg-green-100 p-3 w-fit mx-auto mb-3 dark:bg-green-900/20">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Stay Critical</h3>
                <p className="text-sm text-muted-foreground">Always verify and review AI outputs</p>
              </div>
              <div className="text-center">
                <div className="rounded-lg bg-purple-100 p-3 w-fit mx-auto mb-3 dark:bg-purple-900/20">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Keep Learning</h3>
                <p className="text-sm text-muted-foreground">Continuously improve your AI skills and knowledge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}