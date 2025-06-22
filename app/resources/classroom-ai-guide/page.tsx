import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CheckCircle, AlertTriangle, Users, BookOpen, Shield, Lightbulb } from "lucide-react"

export const metadata = {
  title: "Classroom AI Implementation Guide - ThriveWithAI",
  description: "Step-by-step guide for educators to successfully introduce and implement AI tools in their classroom environment.",
}

export default function ClassroomAIGuidePage() {
  const implementationSteps = [
    {
      phase: "Phase 1: Foundation",
      duration: "Weeks 1-2",
      steps: [
        "Assess your current technology infrastructure",
        "Review school policies on AI tool usage",
        "Identify specific learning objectives AI can support",
        "Start with one simple AI tool for personal use"
      ]
    },
    {
      phase: "Phase 2: Preparation", 
      duration: "Weeks 3-4",
      steps: [
        "Create lesson plans incorporating AI tools",
        "Prepare student guidelines for AI usage",
        "Set up necessary accounts and access",
        "Plan assessment strategies for AI-assisted work"
      ]
    },
    {
      phase: "Phase 3: Introduction",
      duration: "Weeks 5-6", 
      steps: [
        "Introduce AI concepts to students",
        "Demonstrate proper AI tool usage",
        "Start with guided AI activities",
        "Establish classroom AI ethics guidelines"
      ]
    },
    {
      phase: "Phase 4: Integration",
      duration: "Weeks 7-8",
      steps: [
        "Incorporate AI into regular assignments",
        "Encourage student experimentation",
        "Monitor and adjust implementation",
        "Collect feedback from students"
      ]
    }
  ]

  const bestPractices = [
    {
      title: "Start Small",
      description: "Begin with one AI tool and gradually expand your toolkit as you become more comfortable."
    },
    {
      title: "Focus on Learning Objectives",
      description: "Always ensure AI usage aligns with and supports your educational goals."
    },
    {
      title: "Teach Critical Thinking",
      description: "Help students evaluate AI outputs and understand when to trust or question results."
    },
    {
      title: "Maintain Human Connection",
      description: "Use AI to enhance, not replace, meaningful teacher-student interactions."
    },
    {
      title: "Document Everything",
      description: "Keep records of what works, what doesn't, and lessons learned for future reference."
    },
    {
      title: "Stay Flexible",
      description: "Be prepared to adjust your approach based on student needs and feedback."
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Classroom AI Guide", href: "/resources/classroom-ai-guide", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Classroom AI Implementation Guide
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A step-by-step approach to successfully introducing AI tools in your classroom
          </p>
          <Badge variant="secondary" className="mt-4">
            For Educators
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Getting Started with AI in Education</CardTitle>
            <CardDescription>
              Transform your teaching with AI while maintaining educational integrity
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              Implementing AI in the classroom doesn't have to be overwhelming. This guide provides 
              a structured approach to introducing AI tools that enhance learning while maintaining 
              the human elements that make education meaningful.
            </p>
            <p>
              The key is to start small, focus on your learning objectives, and gradually build 
              both your confidence and your students' AI literacy. Remember: AI is a tool to 
              amplify your teaching expertise, not replace it.
            </p>
          </CardContent>
        </Card>

        {/* Implementation Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">8-Week Implementation Timeline</h2>
          <div className="space-y-6">
            {implementationSteps.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Practices for Classroom AI</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    {practice.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety and Ethics */}
        <Card className="mb-12 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-orange-600" />
              Safety and Ethics Considerations
            </CardTitle>
            <CardDescription>
              Essential guidelines for responsible AI use in educational settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Do:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Teach students to verify AI-generated information</li>
                  <li>• Establish clear guidelines for AI usage</li>
                  <li>• Encourage transparency about AI assistance</li>
                  <li>• Focus on AI as a learning tool, not a shortcut</li>
                  <li>• Protect student privacy and data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Don't:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Allow AI to replace critical thinking</li>
                  <li>• Use AI for high-stakes assessments without disclosure</li>
                  <li>• Share sensitive student information with AI tools</li>
                  <li>• Assume all AI outputs are accurate</li>
                  <li>• Ignore your school's technology policies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recommended AI Tools for Beginners</CardTitle>
            <CardDescription>
              Start with these educator-friendly AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">ChatGPT for Education</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Lesson planning, content creation, and student support
                </p>
                <Badge variant="outline" className="text-xs">Free & Paid</Badge>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Grammarly</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Writing assistance for both teachers and students
                </p>
                <Badge variant="outline" className="text-xs">Free & Paid</Badge>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Canva AI</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Create engaging visual materials and presentations
                </p>
                <Badge variant="outline" className="text-xs">Free & Paid</Badge>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Kahoot! AI</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Generate interactive quizzes and learning games
                </p>
                <Badge variant="outline" className="text-xs">Free & Paid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}