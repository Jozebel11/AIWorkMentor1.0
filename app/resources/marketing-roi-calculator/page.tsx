import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react"

export const metadata = {
  title: "AI Marketing ROI Calculator - ThriveWithAI",
  description: "Calculate the return on investment for implementing AI tools in your marketing strategy with our comprehensive ROI calculator.",
}

export default function MarketingROICalculatorPage() {
  const roiFactors = [
    {
      category: "Time Savings",
      icon: Clock,
      metrics: [
        "Content creation speed increase (2-5x faster)",
        "Campaign setup time reduction (50-70%)",
        "Data analysis automation (80-90% faster)",
        "Social media management efficiency (3-4x improvement)"
      ],
      calculation: "Hours saved × Hourly rate × 52 weeks"
    },
    {
      category: "Quality Improvements",
      icon: TrendingUp,
      metrics: [
        "Increased engagement rates (15-30% improvement)",
        "Better targeting accuracy (20-40% improvement)",
        "Improved conversion rates (10-25% increase)",
        "Enhanced personalization effectiveness"
      ],
      calculation: "Improved performance × Revenue impact"
    },
    {
      category: "Cost Reductions",
      icon: DollarSign,
      metrics: [
        "Reduced need for external agencies",
        "Lower content production costs",
        "Decreased ad spend waste (15-25% reduction)",
        "Reduced manual labor costs"
      ],
      calculation: "Previous costs - New costs with AI"
    },
    {
      category: "Revenue Growth",
      icon: Calculator,
      metrics: [
        "Increased lead generation (20-50% more leads)",
        "Higher customer lifetime value",
        "Faster time-to-market for campaigns",
        "Improved customer retention rates"
      ],
      calculation: "Additional revenue × Profit margin"
    }
  ]

  const caseStudies = [
    {
      company: "E-commerce Startup",
      industry: "Retail",
      investment: "$2,400/year",
      results: {
        timeSaved: "15 hours/week",
        costSavings: "$18,000/year",
        revenueIncrease: "25%",
        roi: "650%"
      },
      tools: ["ChatGPT Plus", "Midjourney", "Copy.ai"]
    },
    {
      company: "B2B SaaS Company",
      industry: "Technology",
      investment: "$4,800/year",
      results: {
        timeSaved: "25 hours/week",
        costSavings: "$35,000/year",
        revenueIncrease: "40%",
        roi: "850%"
      },
      tools: ["ChatGPT Team", "Jasper", "Canva Pro", "HubSpot AI"]
    },
    {
      company: "Marketing Agency",
      industry: "Services",
      investment: "$7,200/year",
      results: {
        timeSaved: "40 hours/week",
        costSavings: "$60,000/year",
        revenueIncrease: "60%",
        roi: "1200%"
      },
      tools: ["Multiple AI tools", "Custom integrations", "Team training"]
    }
  ]

  const calculationSteps = [
    {
      step: "1. Assess Current Costs",
      description: "Calculate your current marketing expenses and time investment",
      items: [
        "Staff time spent on content creation",
        "External agency or freelancer costs",
        "Tool and software subscriptions",
        "Advertising spend and waste"
      ]
    },
    {
      step: "2. Estimate AI Tool Costs",
      description: "Determine the investment needed for AI implementation",
      items: [
        "AI tool subscriptions and licenses",
        "Training and onboarding time",
        "Integration and setup costs",
        "Ongoing maintenance expenses"
      ]
    },
    {
      step: "3. Project Time Savings",
      description: "Calculate efficiency gains from AI automation",
      items: [
        "Content creation speed improvements",
        "Campaign setup time reduction",
        "Data analysis automation",
        "Routine task elimination"
      ]
    },
    {
      step: "4. Measure Performance Gains",
      description: "Estimate improvements in marketing effectiveness",
      items: [
        "Increased engagement and conversion rates",
        "Better targeting and personalization",
        "Improved campaign performance",
        "Enhanced customer experience"
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing ROI Calculator", href: "/resources/marketing-roi-calculator", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Marketing ROI Calculator
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Calculate the return on investment for AI tools in your marketing strategy
          </p>
          <Badge variant="secondary" className="mt-4">
            For Marketing Teams
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Why Calculate AI Marketing ROI?</CardTitle>
            <CardDescription>
              Make data-driven decisions about AI tool investments
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              Implementing AI in marketing requires investment, but the returns can be substantial. 
              This calculator helps you quantify the potential benefits and make informed decisions 
              about which AI tools will deliver the best ROI for your specific situation.
            </p>
            <p>
              Most marketing teams see ROI of 300-1000% within the first year of implementing 
              AI tools effectively. The key is understanding where AI can have the biggest 
              impact on your workflow and bottom line.
            </p>
          </CardContent>
        </Card>

        {/* ROI Factors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key ROI Factors to Consider</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {roiFactors.map((factor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <factor.icon className="h-5 w-5 text-primary" />
                    {factor.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {factor.metrics.map((metric, mIndex) => (
                      <li key={mIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{metric}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">Calculation:</p>
                    <p className="text-sm text-muted-foreground">{factor.calculation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">ROI Calculation Process</h2>
          <div className="space-y-6">
            {calculationSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.step}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <Calculator className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Real-World ROI Examples</h2>
          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{study.company}</CardTitle>
                      <CardDescription>{study.industry}</CardDescription>
                    </div>
                    <Badge variant="outline">ROI: {study.results.roi}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Investment & Results</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Annual Investment:</span>
                          <span className="font-medium">{study.investment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Saved:</span>
                          <span className="font-medium">{study.results.timeSaved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost Savings:</span>
                          <span className="font-medium">{study.results.costSavings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue Increase:</span>
                          <span className="font-medium">{study.results.revenueIncrease}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tools Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Simple Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Quick ROI Estimate</CardTitle>
            <CardDescription>
              Use these average benchmarks to estimate your potential ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Average Improvements with AI:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Content creation speed:</span>
                    <span className="font-medium">3x faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campaign setup time:</span>
                    <span className="font-medium">60% reduction</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement rates:</span>
                    <span className="font-medium">25% increase</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion rates:</span>
                    <span className="font-medium">18% increase</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ad spend efficiency:</span>
                    <span className="font-medium">20% improvement</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Typical Investment Ranges:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Small team (1-3 people):</span>
                    <span className="font-medium">$100-300/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium team (4-10 people):</span>
                    <span className="font-medium">$300-800/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Large team (10+ people):</span>
                    <span className="font-medium">$800-2000/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training & setup:</span>
                    <span className="font-medium">$1000-5000 one-time</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-background/50 rounded-lg">
              <p className="text-sm font-medium mb-2">💡 Quick Formula:</p>
              <p className="text-sm">
                <strong>ROI = (Time Saved × Hourly Rate + Performance Gains × Revenue Impact - AI Tool Costs) ÷ AI Tool Costs × 100</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Calculate Your ROI?</CardTitle>
            <CardDescription>
              Take these steps to get started with AI marketing tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Start Small:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Begin with 1-2 AI tools</li>
                  <li>• Focus on your biggest time drains</li>
                  <li>• Track results from day one</li>
                  <li>• Scale based on proven ROI</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Measure Success:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Set baseline metrics before starting</li>
                  <li>• Track time savings weekly</li>
                  <li>• Monitor performance improvements</li>
                  <li>• Calculate ROI monthly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}