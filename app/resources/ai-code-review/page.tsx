import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CheckCircle, AlertTriangle, Code, Shield, Bug, Zap } from "lucide-react"

export const metadata = {
  title: "AI Code Review Checklist - ThriveWithAI",
  description: "Essential checklist and best practices for reviewing AI-generated code to ensure quality, security, and maintainability.",
}

export default function AICodeReviewPage() {
  const reviewCategories = [
    {
      icon: Bug,
      title: "Logic & Functionality",
      color: "text-red-600",
      checks: [
        "Does the code solve the intended problem correctly?",
        "Are all edge cases properly handled?",
        "Is the algorithm efficient for the expected data size?",
        "Are there any logical errors or infinite loops?",
        "Does the code handle null/undefined values appropriately?"
      ]
    },
    {
      icon: Shield,
      title: "Security",
      color: "text-orange-600", 
      checks: [
        "Are user inputs properly validated and sanitized?",
        "Is sensitive data handled securely?",
        "Are there any SQL injection vulnerabilities?",
        "Is authentication and authorization implemented correctly?",
        "Are API keys and secrets properly protected?"
      ]
    },
    {
      icon: Code,
      title: "Code Quality",
      color: "text-blue-600",
      checks: [
        "Are variable and function names descriptive and clear?",
        "Is the code properly formatted and consistent?",
        "Are functions and classes appropriately sized?",
        "Is there adequate error handling?",
        "Are magic numbers and strings avoided?"
      ]
    },
    {
      icon: Zap,
      title: "Performance",
      color: "text-green-600",
      checks: [
        "Are there any obvious performance bottlenecks?",
        "Is memory usage optimized?",
        "Are database queries efficient?",
        "Is caching implemented where appropriate?",
        "Are unnecessary computations avoided?"
      ]
    }
  ]

  const commonIssues = [
    {
      issue: "Overly Complex Solutions",
      description: "AI sometimes generates unnecessarily complex code for simple problems",
      solution: "Simplify the logic and break down complex functions into smaller, manageable pieces"
    },
    {
      issue: "Missing Error Handling",
      description: "AI-generated code may not include comprehensive error handling",
      solution: "Add try-catch blocks, input validation, and graceful error recovery mechanisms"
    },
    {
      issue: "Outdated Patterns",
      description: "AI might suggest deprecated methods or outdated coding patterns",
      solution: "Verify that all methods and libraries are current and follow modern best practices"
    },
    {
      issue: "Insufficient Comments",
      description: "AI code often lacks explanatory comments for complex logic",
      solution: "Add clear comments explaining the purpose, assumptions, and complex algorithms"
    },
    {
      issue: "Security Vulnerabilities",
      description: "AI may not always consider security implications in its solutions",
      solution: "Implement proper input validation, authentication, and follow security best practices"
    }
  ]

  const reviewProcess = [
    {
      step: "1. Initial Assessment",
      description: "Quick overview of the generated code",
      actions: [
        "Read through the entire code block",
        "Understand the intended functionality",
        "Check if it addresses the original requirements",
        "Identify any obvious red flags"
      ]
    },
    {
      step: "2. Detailed Analysis",
      description: "Line-by-line code examination",
      actions: [
        "Verify logic correctness",
        "Check for security vulnerabilities",
        "Assess code quality and readability",
        "Evaluate performance implications"
      ]
    },
    {
      step: "3. Testing & Validation",
      description: "Practical verification of functionality",
      actions: [
        "Run the code with sample inputs",
        "Test edge cases and error conditions",
        "Verify integration with existing systems",
        "Check for any runtime errors"
      ]
    },
    {
      step: "4. Refinement",
      description: "Improve and optimize the code",
      actions: [
        "Refactor for better readability",
        "Optimize for performance if needed",
        "Add comprehensive error handling",
        "Include proper documentation"
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "AI Code Review", href: "/resources/ai-code-review", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            AI Code Review Checklist
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Essential guidelines for reviewing and improving AI-generated code
          </p>
          <Badge variant="secondary" className="mt-4">
            For Developers
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Why AI Code Review Matters</CardTitle>
            <CardDescription>
              AI is a powerful coding assistant, but human oversight is essential
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              AI tools like GitHub Copilot and ChatGPT can generate impressive code quickly, 
              but they're not infallible. They may produce code that works but isn't optimal, 
              secure, or maintainable. This checklist helps you review AI-generated code 
              systematically to ensure it meets professional standards.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">🎯 Remember:</p>
              <p className="text-sm">
                AI is your coding partner, not your replacement. Always apply your expertise 
                to validate, improve, and ensure the code meets your project's specific needs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Review Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Code Review Categories</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {reviewCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{check}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Review Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Step-by-Step Review Process</h2>
          <div className="space-y-6">
            {reviewProcess.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.step}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common AI Code Issues & Solutions</h2>
          <div className="space-y-4">
            {commonIssues.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.issue}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Solution:</p>
                        <p className="text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Quick Reference Checklist</CardTitle>
            <CardDescription>
              Print-friendly checklist for daily use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3 text-green-600">✅ Before Accepting AI Code:</h3>
                <ul className="space-y-1 text-sm">
                  <li>□ Code solves the intended problem</li>
                  <li>□ No obvious security vulnerabilities</li>
                  <li>□ Error handling is adequate</li>
                  <li>□ Code is readable and well-structured</li>
                  <li>□ Performance is acceptable</li>
                  <li>□ Follows project coding standards</li>
                  <li>□ Includes necessary comments</li>
                  <li>□ Tested with sample inputs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-red-600">❌ Red Flags to Watch For:</h3>
                <ul className="space-y-1 text-sm">
                  <li>□ Hardcoded sensitive information</li>
                  <li>□ No input validation</li>
                  <li>□ Overly complex solutions</li>
                  <li>□ Deprecated methods or libraries</li>
                  <li>□ Missing error handling</li>
                  <li>□ Unclear variable names</li>
                  <li>□ Potential infinite loops</li>
                  <li>□ Memory leaks or inefficiencies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}