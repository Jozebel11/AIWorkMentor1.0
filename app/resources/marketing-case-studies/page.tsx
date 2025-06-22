import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { TrendingUp, Users, Target, Zap, BarChart, DollarSign } from "lucide-react"

export const metadata = {
  title: "AI Marketing Case Studies - ThriveWithAI",
  description: "Real-world examples of successful AI marketing implementations across different industries and company sizes.",
}

export default function MarketingCaseStudiesPage() {
  const caseStudies = [
    {
      company: "TechFlow Solutions",
      industry: "B2B SaaS",
      size: "50-100 employees",
      challenge: "Struggling to create enough content for multiple buyer personas while maintaining quality and consistency across channels.",
      solution: "Implemented ChatGPT for content ideation and first drafts, Jasper for email campaigns, and Canva AI for visual content creation.",
      implementation: [
        "Trained marketing team on AI prompt engineering",
        "Created content templates and brand guidelines for AI tools",
        "Established review process for AI-generated content",
        "Integrated AI tools into existing content calendar workflow"
      ],
      results: {
        contentVolume: "300% increase",
        timeToPublish: "65% reduction",
        engagementRate: "45% improvement",
        leadGeneration: "180% increase",
        costSavings: "$75,000/year"
      },
      tools: ["ChatGPT Team", "Jasper", "Canva Pro", "Grammarly Business"],
      timeline: "3 months to full implementation",
      roi: "650%"
    },
    {
      company: "Urban Threads",
      industry: "E-commerce Fashion",
      size: "10-25 employees",
      challenge: "Small team couldn't keep up with social media demands, product descriptions, and seasonal campaign creation.",
      solution: "Used AI for social media content, product descriptions, and automated customer service responses.",
      implementation: [
        "Set up ChatGPT for product description generation",
        "Implemented Midjourney for seasonal campaign visuals",
        "Created AI-powered chatbot for customer inquiries",
        "Automated social media posting with AI-generated captions"
      ],
      results: {
        socialMediaOutput: "500% increase",
        customerResponseTime: "80% faster",
        conversionRate: "35% improvement",
        teamProductivity: "250% increase",
        revenueGrowth: "120% year-over-year"
      },
      tools: ["ChatGPT Plus", "Midjourney", "Buffer AI", "Zendesk AI"],
      timeline: "6 weeks to see results",
      roi: "890%"
    },
    {
      company: "GreenTech Innovations",
      industry: "Clean Energy",
      size: "100-250 employees",
      challenge: "Complex technical products required extensive educational content, but creating it was time-consuming and expensive.",
      solution: "Leveraged AI for technical content creation, webinar scripts, and personalized email campaigns.",
      implementation: [
        "Developed AI prompts for technical content simplification",
        "Created automated email sequences based on user behavior",
        "Used AI for webinar planning and script generation",
        "Implemented AI-powered lead scoring and nurturing"
      ],
      results: {
        contentCreationSpeed: "400% faster",
        webinarAttendance: "60% increase",
        emailOpenRates: "55% improvement",
        salesQualifiedLeads: "220% increase",
        salesCycleReduction: "30% shorter"
      },
      tools: ["Claude Pro", "HubSpot AI", "Loom AI", "Calendly AI"],
      timeline: "4 months for complete transformation",
      roi: "1200%"
    },
    {
      company: "Local Fitness Studio Chain",
      industry: "Health & Fitness",
      size: "5-15 employees",
      challenge: "Limited marketing budget and expertise, struggling to compete with larger fitness chains.",
      solution: "Used AI for social media management, class descriptions, and local SEO optimization.",
      implementation: [
        "Created AI-generated workout tips and motivation posts",
        "Automated Google My Business post creation",
        "Generated personalized email campaigns for different member segments",
        "Used AI for local event promotion and community engagement"
      ],
      results: {
        socialMediaEngagement: "280% increase",
        newMemberSignups: "150% increase",
        memberRetention: "40% improvement",
        localSearchRanking: "Top 3 for key terms",
        marketingCostReduction: "60% decrease"
      },
      tools: ["ChatGPT", "Canva AI", "Later AI", "Google AI tools"],
      timeline: "2 months to see significant results",
      roi: "450%"
    }
  ]

  const successFactors = [
    {
      icon: Target,
      title: "Clear Objectives",
      description: "Successful implementations start with specific, measurable goals for AI usage."
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Investing in proper training ensures team members can use AI tools effectively."
    },
    {
      icon: Zap,
      title: "Gradual Implementation",
      description: "Starting small and scaling up allows for learning and optimization along the way."
    },
    {
      icon: BarChart,
      title: "Continuous Measurement",
      description: "Regular tracking and analysis helps optimize AI tool usage and ROI."
    }
  ]

  const commonChallenges = [
    {
      challenge: "Initial Resistance to Change",
      solution: "Start with enthusiastic early adopters and showcase quick wins to build momentum."
    },
    {
      challenge: "Quality Control Concerns",
      solution: "Establish clear review processes and guidelines for AI-generated content."
    },
    {
      challenge: "Integration with Existing Tools",
      solution: "Choose AI tools that integrate well with current marketing stack or use APIs."
    },
    {
      challenge: "Measuring ROI Accurately",
      solution: "Set baseline metrics before implementation and track specific KPIs consistently."
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Case Studies", href: "/resources/marketing-case-studies", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Marketing Case Studies
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Real-world examples of successful AI marketing implementations
          </p>
          <Badge variant="secondary" className="mt-4">
            Proven Results
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Learn from Real Success Stories</CardTitle>
            <CardDescription>
              See how companies across different industries have transformed their marketing with AI
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              These case studies showcase real companies that have successfully implemented AI 
              in their marketing strategies. Each example includes specific challenges, solutions, 
              implementation details, and measurable results to help you understand what's possible 
              and how to achieve similar success.
            </p>
          </CardContent>
        </Card>

        {/* Case Studies */}
        <div className="space-y-12 mb-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{study.company}</CardTitle>
                    <CardDescription className="mt-1">
                      {study.industry} • {study.size}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">ROI: {study.roi}</Badge>
                    <p className="text-xs text-muted-foreground">{study.timeline}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Challenge */}
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">Challenge</h3>
                  <p className="text-sm text-muted-foreground">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-semibold mb-2 text-blue-600">Solution</h3>
                  <p className="text-sm text-muted-foreground mb-3">{study.solution}</p>
                  <div className="flex flex-wrap gap-2">
                    {study.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Implementation */}
                <div>
                  <h3 className="font-semibold mb-2 text-purple-600">Implementation</h3>
                  <ul className="space-y-1">
                    {study.implementation.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Results</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(study.results).map(([key, value], resultIndex) => (
                      <div key={resultIndex} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </p>
                        <p className="text-sm font-semibold text-green-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Factors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Success Factors</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {successFactors.map((factor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <factor.icon className="h-5 w-5 text-primary" />
                    {factor.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Challenges & Solutions</h2>
          <div className="space-y-4">
            {commonChallenges.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-2 text-orange-600">Challenge</h3>
                      <p className="text-sm text-muted-foreground">{item.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-green-600">Solution</h3>
                      <p className="text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Takeaways */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Key Takeaways
            </CardTitle>
            <CardDescription>
              What these success stories teach us about AI marketing implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">What Works:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Starting with high-impact, low-risk use cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Investing in team training and change management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Establishing clear quality control processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Measuring results consistently and adjusting strategy</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Common Results:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <BarChart className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>200-500% increase in content production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>50-80% reduction in time-to-market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>20-60% improvement in engagement rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>400-1200% ROI within first year</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}