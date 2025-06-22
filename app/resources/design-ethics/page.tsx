import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Shield, Eye, Users, AlertTriangle, CheckCircle, Scale } from "lucide-react"

export const metadata = {
  title: "AI Design Ethics Guide - ThriveWithAI",
  description: "Essential ethical considerations and best practices for using AI tools in design work, including copyright, attribution, and professional responsibility.",
}

export default function DesignEthicsPage() {
  const ethicalPrinciples = [
    {
      icon: Shield,
      title: "Transparency & Attribution",
      description: "Be honest about AI assistance in your design work",
      guidelines: [
        "Disclose AI usage when required by clients or contracts",
        "Be transparent about the extent of AI assistance",
        "Credit AI tools appropriately in project documentation",
        "Don't misrepresent AI-generated work as entirely human-created",
        "Maintain clear records of AI tool usage for each project"
      ]
    },
    {
      icon: Eye,
      title: "Quality & Responsibility",
      description: "Maintain professional standards and take responsibility for outputs",
      guidelines: [
        "Review and refine all AI-generated content before delivery",
        "Ensure designs meet accessibility and usability standards",
        "Verify that AI outputs align with project requirements",
        "Take responsibility for the final design quality",
        "Don't rely solely on AI without applying design expertise"
      ]
    },
    {
      icon: Users,
      title: "Respect for Others",
      description: "Consider the impact of AI usage on the design community",
      guidelines: [
        "Respect intellectual property and copyright laws",
        "Don't use AI to copy or closely imitate others' work",
        "Consider the impact on other designers and illustrators",
        "Support fair compensation for creative work",
        "Promote ethical AI practices within the design community"
      ]
    },
    {
      icon: Scale,
      title: "Professional Integrity",
      description: "Maintain ethical standards in client relationships and business practices",
      guidelines: [
        "Be honest about capabilities and limitations",
        "Price work fairly considering AI assistance",
        "Maintain confidentiality of client information",
        "Don't use client data to train personal AI models",
        "Respect client preferences regarding AI usage"
      ]
    }
  ]

  const commonDilemmas = [
    {
      scenario: "Client Attribution Requirements",
      dilemma: "A client specifically asks if any AI was used in the design process",
      ethicalResponse: "Be completely honest about AI usage, explain how it was used, and emphasize your creative direction and refinement",
      considerations: [
        "Some clients may have policies against AI-generated content",
        "Transparency builds trust and long-term relationships",
        "Document AI usage throughout the project",
        "Explain the value you added beyond AI generation"
      ]
    },
    {
      scenario: "Copyright and Originality",
      dilemma: "AI generates a design that closely resembles existing copyrighted work",
      ethicalResponse: "Don't use the design, research the original work, and create an alternative approach that's clearly original",
      considerations: [
        "AI training data may include copyrighted material",
        "Similarity doesn't always mean copyright infringement",
        "When in doubt, create original alternatives",
        "Consider using reverse image searches to check for similarities"
      ]
    },
    {
      scenario: "Pricing AI-Assisted Work",
      dilemma: "How to price design work when AI significantly reduces time investment",
      ethicalResponse: "Price based on value delivered to client, not just time spent, while being fair about efficiency gains",
      considerations: [
        "Consider the value and expertise you bring to the project",
        "AI tools are an investment in your capabilities",
        "Clients benefit from faster turnaround and iteration",
        "Be transparent about your process if asked"
      ]
    },
    {
      scenario: "Team Collaboration",
      dilemma: "Some team members are uncomfortable with AI usage in collaborative projects",
      ethicalResponse: "Discuss concerns openly, establish team guidelines, and ensure everyone is comfortable with the approach",
      considerations: [
        "Respect different comfort levels with AI",
        "Establish clear team policies and workflows",
        "Provide training and support for those interested",
        "Find compromise solutions that work for everyone"
      ]
    }
  ]

  const bestPractices = [
    {
      category: "Documentation",
      practices: [
        "Keep records of which AI tools were used for each project",
        "Document the prompts and processes used",
        "Save original AI outputs alongside final designs",
        "Note any significant modifications made to AI-generated content"
      ]
    },
    {
      category: "Client Communication",
      practices: [
        "Discuss AI usage policies during project kickoff",
        "Include AI usage terms in contracts when relevant",
        "Explain how AI enhances rather than replaces your expertise",
        "Be proactive about addressing client concerns"
      ]
    },
    {
      category: "Quality Control",
      practices: [
        "Always review AI outputs for accuracy and appropriateness",
        "Check for potential copyright or trademark issues",
        "Ensure designs meet accessibility standards",
        "Verify that outputs align with brand guidelines"
      ]
    },
    {
      category: "Professional Development",
      practices: [
        "Stay informed about AI ethics developments in design",
        "Participate in industry discussions about AI usage",
        "Continue developing your core design skills",
        "Share knowledge and best practices with peers"
      ]
    }
  ]

  const redFlags = [
    "Presenting AI-generated work as entirely your own creation",
    "Using AI to copy or closely imitate copyrighted designs",
    "Ignoring client policies or preferences about AI usage",
    "Charging full rates without disclosing significant AI assistance",
    "Using client data or confidential information in AI prompts",
    "Relying entirely on AI without applying design expertise",
    "Failing to check AI outputs for accuracy or appropriateness",
    "Using AI-generated content that could be harmful or offensive"
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Design Ethics", href: "/resources/design-ethics", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Design Ethics Guide
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Navigate ethical considerations when using AI tools in design work
          </p>
          <Badge variant="secondary" className="mt-4">
            Essential Reading
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Why AI Design Ethics Matter</CardTitle>
            <CardDescription>
              Responsible AI usage protects your reputation and the design profession
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              As AI tools become more powerful and prevalent in design, ethical considerations 
              become increasingly important. This isn't just about following rules—it's about 
              maintaining the integrity of the design profession, respecting the rights of others, 
              and building sustainable practices that benefit everyone.
            </p>
            <p>
              Ethical AI usage in design helps build trust with clients, protects against legal 
              issues, and ensures that AI enhances rather than undermines the creative industry. 
              By following these guidelines, you can harness AI's power responsibly.
            </p>
          </CardContent>
        </Card>

        {/* Ethical Principles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Core Ethical Principles</h2>
          <div className="space-y-6">
            {ethicalPrinciples.map((principle, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <principle.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                      <CardDescription>{principle.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {principle.guidelines.map((guideline, guidelineIndex) => (
                      <li key={guidelineIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Ethical Dilemmas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Ethical Dilemmas & Solutions</h2>
          <div className="space-y-6">
            {commonDilemmas.map((dilemma, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{dilemma.scenario}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-orange-600">The Dilemma:</h4>
                      <p className="text-sm text-muted-foreground">{dilemma.dilemma}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Ethical Response:</h4>
                      <p className="text-sm">{dilemma.ethicalResponse}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Considerations:</h4>
                      <ul className="space-y-1">
                        {dilemma.considerations.map((consideration, cIndex) => (
                          <li key={cIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Practices by Category</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {bestPractices.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <Card className="mb-12 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Ethical Red Flags to Avoid
            </CardTitle>
            <CardDescription>
              Practices that could damage your reputation or violate ethical standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ethical AI Design Summary</CardTitle>
            <CardDescription>
              Key principles for responsible AI usage in design work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="rounded-lg bg-blue-100 p-3 w-fit mx-auto mb-3 dark:bg-blue-900/20">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Be Transparent</h3>
                <p className="text-sm text-muted-foreground">
                  Honest communication about AI usage builds trust and maintains professional integrity
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-lg bg-green-100 p-3 w-fit mx-auto mb-3 dark:bg-green-900/20">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Respect Others</h3>
                <p className="text-sm text-muted-foreground">
                  Consider the impact on clients, colleagues, and the broader creative community
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-lg bg-purple-100 p-3 w-fit mx-auto mb-3 dark:bg-purple-900/20">
                  <Scale className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Maintain Standards</h3>
                <p className="text-sm text-muted-foreground">
                  Use AI to enhance, not replace, your professional expertise and creative judgment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}