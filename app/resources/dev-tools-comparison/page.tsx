import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CheckCircle, XCircle, Star, DollarSign, Users, Zap } from "lucide-react"

export const metadata = {
  title: "Developer AI Tools Comparison - ThriveWithAI",
  description: "Comprehensive comparison of AI development tools including GitHub Copilot, ChatGPT, Claude, and more to help you choose the right tools.",
}

export default function DevToolsComparisonPage() {
  const tools = [
    {
      name: "GitHub Copilot",
      category: "Code Completion",
      pricing: "$10/month",
      rating: 4.5,
      strengths: [
        "Excellent IDE integration",
        "Context-aware suggestions",
        "Supports many languages",
        "Real-time code completion",
        "Large training dataset"
      ],
      weaknesses: [
        "Subscription required",
        "Can suggest outdated patterns",
        "Limited explanation capabilities",
        "Occasional irrelevant suggestions"
      ],
      bestFor: "Daily coding assistance and productivity boost",
      languages: ["JavaScript", "Python", "Java", "C++", "Go", "Ruby", "PHP"],
      features: {
        codeCompletion: true,
        codeExplanation: false,
        debugging: true,
        documentation: false,
        refactoring: true
      }
    },
    {
      name: "ChatGPT",
      category: "Conversational AI",
      pricing: "Free / $20/month",
      rating: 4.3,
      strengths: [
        "Excellent code explanation",
        "Great for learning concepts",
        "Handles complex queries",
        "Good debugging assistance",
        "Free tier available"
      ],
      weaknesses: [
        "No IDE integration",
        "Context window limitations",
        "May provide outdated info",
        "Requires copy-paste workflow"
      ],
      bestFor: "Learning, debugging, and code explanation",
      languages: ["All major languages", "Pseudocode", "SQL", "Shell"],
      features: {
        codeCompletion: false,
        codeExplanation: true,
        debugging: true,
        documentation: true,
        refactoring: true
      }
    },
    {
      name: "Claude",
      category: "Conversational AI",
      pricing: "Free / $20/month",
      rating: 4.4,
      strengths: [
        "Excellent reasoning ability",
        "Great for complex problems",
        "Strong code analysis",
        "Good at following instructions",
        "Handles large codebases well"
      ],
      weaknesses: [
        "No IDE integration",
        "Limited availability",
        "Smaller user community",
        "Copy-paste workflow"
      ],
      bestFor: "Complex problem solving and code architecture",
      languages: ["All major languages", "System design", "Architecture"],
      features: {
        codeCompletion: false,
        codeExplanation: true,
        debugging: true,
        documentation: true,
        refactoring: true
      }
    },
    {
      name: "Tabnine",
      category: "Code Completion",
      pricing: "Free / $12/month",
      rating: 4.0,
      strengths: [
        "Privacy-focused",
        "On-device processing option",
        "Good IDE integration",
        "Team training capabilities",
        "Customizable models"
      ],
      weaknesses: [
        "Less accurate than Copilot",
        "Smaller training dataset",
        "Limited free tier",
        "Fewer language features"
      ],
      bestFor: "Privacy-conscious teams and custom models",
      languages: ["JavaScript", "Python", "Java", "C#", "Go", "Rust"],
      features: {
        codeCompletion: true,
        codeExplanation: false,
        debugging: false,
        documentation: false,
        refactoring: true
      }
    },
    {
      name: "Codeium",
      category: "Code Completion",
      pricing: "Free / $12/month",
      rating: 4.1,
      strengths: [
        "Generous free tier",
        "Fast suggestions",
        "Good language support",
        "Chat functionality",
        "Competitive pricing"
      ],
      weaknesses: [
        "Newer tool with smaller community",
        "Less refined than established tools",
        "Limited advanced features",
        "Occasional accuracy issues"
      ],
      bestFor: "Budget-conscious developers and students",
      languages: ["JavaScript", "Python", "Java", "C++", "TypeScript"],
      features: {
        codeCompletion: true,
        codeExplanation: true,
        debugging: true,
        documentation: false,
        refactoring: true
      }
    }
  ]

  const comparisonMatrix = [
    { feature: "Real-time Code Completion", copilot: true, chatgpt: false, claude: false, tabnine: true, codeium: true },
    { feature: "Code Explanation", copilot: false, chatgpt: true, claude: true, tabnine: false, codeium: true },
    { feature: "Debugging Assistance", copilot: true, chatgpt: true, claude: true, tabnine: false, codeium: true },
    { feature: "Documentation Generation", copilot: false, chatgpt: true, claude: true, tabnine: false, codeium: false },
    { feature: "IDE Integration", copilot: true, chatgpt: false, claude: false, tabnine: true, codeium: true },
    { feature: "Free Tier", copilot: false, chatgpt: true, claude: true, tabnine: true, codeium: true },
    { feature: "Offline Capability", copilot: false, chatgpt: false, claude: false, tabnine: true, codeium: false },
    { feature: "Custom Training", copilot: false, chatgpt: false, claude: false, tabnine: true, codeium: false }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Dev Tools Comparison", href: "/resources/dev-tools-comparison", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Developer AI Tools Comparison
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the right AI development tools for your workflow and budget
          </p>
          <Badge variant="secondary" className="mt-4">
            Updated January 2025
          </Badge>
        </div>

        {/* Quick Comparison Matrix */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Feature Comparison Matrix</CardTitle>
            <CardDescription>
              Quick overview of key features across popular AI development tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Feature</th>
                    <th className="text-center py-2 px-2">Copilot</th>
                    <th className="text-center py-2 px-2">ChatGPT</th>
                    <th className="text-center py-2 px-2">Claude</th>
                    <th className="text-center py-2 px-2">Tabnine</th>
                    <th className="text-center py-2 px-2">Codeium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 pr-4 font-medium">{row.feature}</td>
                      <td className="text-center py-2 px-2">
                        {row.copilot ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-2">
                        {row.chatgpt ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-2">
                        {row.claude ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-2">
                        {row.tabnine ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                      </td>
                      <td className="text-center py-2 px-2">
                        {row.codeium ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tool Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Detailed Tool Reviews</h2>
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {tool.name}
                        <Badge variant="outline">{tool.category}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {tool.bestFor}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tool.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        {tool.pricing}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {tool.strengths.map((strength, sIndex) => (
                          <li key={sIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
                      <ul className="space-y-1">
                        {tool.weaknesses.map((weakness, wIndex) => (
                          <li key={wIndex} className="flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium">Languages:</span>
                      {tool.languages.map((lang, lIndex) => (
                        <Badge key={lIndex} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Recommendations</CardTitle>
            <CardDescription>
              Choose the right tool based on your specific needs and workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  For Beginners
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Start with ChatGPT (free) for learning and Codeium for coding assistance.
                </p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">ChatGPT Free</Badge>
                  <Badge variant="outline" className="text-xs">Codeium Free</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  For Productivity
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  GitHub Copilot for daily coding plus ChatGPT for complex problems.
                </p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">GitHub Copilot</Badge>
                  <Badge variant="outline" className="text-xs">ChatGPT Plus</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-950/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  For Privacy
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tabnine with on-device processing for sensitive codebases.
                </p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">Tabnine Pro</Badge>
                  <Badge variant="outline" className="text-xs">Local Models</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}