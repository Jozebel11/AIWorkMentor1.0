import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Target, TrendingUp, Users, Calendar, BarChart, Lightbulb } from "lucide-react"

export const metadata = {
  title: "Content Strategy with AI - ThriveWithAI",
  description: "Learn how to develop and execute content strategies that effectively leverage AI tools for maximum impact and efficiency.",
}

export default function ContentStrategyAIPage() {
  const strategyFramework = [
    {
      icon: Target,
      title: "Define AI-Enhanced Goals",
      description: "Set clear objectives for how AI will improve your content strategy",
      details: [
        "Increase content production volume by 200-300%",
        "Improve content personalization and targeting",
        "Reduce time-to-publish by 50%",
        "Enhance content quality and consistency",
        "Scale content across multiple channels"
      ]
    },
    {
      icon: Users,
      title: "AI-Powered Audience Research",
      description: "Use AI to deeply understand your audience and their needs",
      details: [
        "Analyze audience behavior patterns with AI analytics",
        "Generate detailed buyer personas using AI insights",
        "Identify content gaps through AI-powered research",
        "Predict trending topics and interests",
        "Segment audiences for personalized content"
      ]
    },
    {
      icon: Calendar,
      title: "Intelligent Content Planning",
      description: "Leverage AI for strategic content calendar development",
      details: [
        "Generate content ideas based on trending topics",
        "Optimize publishing schedules using AI analytics",
        "Plan content series and campaigns with AI assistance",
        "Balance content types and formats strategically",
        "Align content with business objectives"
      ]
    },
    {
      icon: BarChart,
      title: "AI-Driven Performance Optimization",
      description: "Continuously improve content performance using AI insights",
      details: [
        "Track and analyze content performance metrics",
        "A/B test headlines, formats, and approaches",
        "Optimize content for search engines with AI",
        "Personalize content recommendations",
        "Predict content success before publishing"
      ]
    }
  ]

  const contentTypes = [
    {
      type: "Blog Posts & Articles",
      aiApplications: [
        "Topic research and ideation",
        "Outline generation and structure",
        "First draft creation and editing",
        "SEO optimization and keyword integration",
        "Meta descriptions and social media snippets"
      ]
    },
    {
      type: "Social Media Content",
      aiApplications: [
        "Platform-specific content adaptation",
        "Hashtag research and optimization",
        "Visual content creation and editing",
        "Engagement prediction and timing",
        "Community management automation"
      ]
    },
    {
      type: "Email Marketing",
      aiApplications: [
        "Subject line optimization",
        "Personalized content generation",
        "Send time optimization",
        "A/B testing automation",
        "Segmentation and targeting"
      ]
    },
    {
      type: "Video & Multimedia",
      aiApplications: [
        "Script writing and storyboarding",
        "Automated video editing",
        "Thumbnail and visual creation",
        "Transcription and captioning",
        "Content repurposing across formats"
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Content Strategy with AI", href: "/resources/content-strategy-ai", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Content Strategy with AI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Build a comprehensive content strategy that leverages AI for maximum impact
          </p>
          <Badge variant="secondary" className="mt-4">
            For Content Creators & Marketers
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">The AI-Powered Content Revolution</CardTitle>
            <CardDescription>
              Transform your content strategy with intelligent automation and insights
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              AI is revolutionizing content strategy by enabling creators to produce more, 
              personalize better, and optimize continuously. This guide shows you how to 
              build a content strategy that harnesses AI's power while maintaining your 
              unique voice and brand identity.
            </p>
            <p>
              The most successful content strategies of the future will be those that 
              seamlessly blend human creativity with AI efficiency. Learn how to be 
              among the leaders in this transformation.
            </p>
          </CardContent>
        </Card>

        {/* Strategy Framework */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI Content Strategy Framework</h2>
          <div className="space-y-6">
            {strategyFramework.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Content Types and AI Applications */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI Applications by Content Type</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {contentTypes.map((content, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{content.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.aiApplications.map((application, appIndex) => (
                      <li key={appIndex} className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{application}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Roadmap */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">90-Day Implementation Roadmap</CardTitle>
            <CardDescription>
              A step-by-step plan to transform your content strategy with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-primary">Days 1-30: Foundation</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Audit current content performance and processes</li>
                  <li>• Select and set up core AI tools</li>
                  <li>• Train team on AI tool usage</li>
                  <li>• Establish AI content guidelines and ethics</li>
                  <li>• Create AI-enhanced content templates</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-600">Days 31-60: Integration</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Implement AI in content ideation and planning</li>
                  <li>• Begin AI-assisted content creation</li>
                  <li>• Set up automated content optimization</li>
                  <li>• Establish performance tracking systems</li>
                  <li>• Test and refine AI workflows</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-600">Days 61-90: Optimization</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Analyze performance data and insights</li>
                  <li>• Scale successful AI implementations</li>
                  <li>• Advanced personalization and targeting</li>
                  <li>• Cross-channel content optimization</li>
                  <li>• Plan for continued AI evolution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Measuring AI Content Strategy Success
            </CardTitle>
            <CardDescription>
              Key metrics to track your AI-enhanced content performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Efficiency Metrics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Content production speed</li>
                  <li>• Time-to-publish reduction</li>
                  <li>• Cost per piece of content</li>
                  <li>• Team productivity increase</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Quality Metrics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Content engagement rates</li>
                  <li>• SEO performance improvement</li>
                  <li>• Brand consistency scores</li>
                  <li>• Audience satisfaction ratings</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Business Impact</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lead generation increase</li>
                  <li>• Conversion rate improvement</li>
                  <li>• Brand awareness growth</li>
                  <li>• Revenue attribution</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}