import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Lightbulb, Palette, Layers, Zap, RefreshCw, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Creative AI Workflow Guide - ThriveWithAI",
  description: "Learn how to integrate AI tools into your creative design workflow for enhanced productivity and innovation.",
}

export default function CreativeAIWorkflowPage() {
  const workflowStages = [
    {
      icon: Lightbulb,
      title: "Ideation & Concept Development",
      description: "Generate and refine creative concepts using AI",
      tools: ["ChatGPT", "Claude", "Midjourney"],
      tasks: [
        "Brainstorm design concepts and themes",
        "Generate mood board ideas and references",
        "Explore different visual directions",
        "Create design briefs and project outlines",
        "Research trends and inspiration"
      ],
      aiPrompts: [
        "Generate 10 unique design concepts for [project type] targeting [audience]",
        "Create a mood board concept for [brand/style] including colors, textures, and visual elements",
        "Suggest innovative approaches to [design challenge] that haven't been widely explored"
      ]
    },
    {
      icon: Palette,
      title: "Visual Asset Creation",
      description: "Create initial visual elements and prototypes",
      tools: ["Midjourney", "DALL-E", "Stable Diffusion", "Canva AI"],
      tasks: [
        "Generate initial visual concepts",
        "Create placeholder images and graphics",
        "Develop color palette variations",
        "Design layout compositions",
        "Produce style variations"
      ],
      aiPrompts: [
        "Create a [style] illustration showing [subject] with [specific details]",
        "Generate a color palette for [brand/project] that conveys [mood/emotion]",
        "Design a layout composition for [type of design] with [specific requirements]"
      ]
    },
    {
      icon: Layers,
      title: "Refinement & Iteration",
      description: "Improve and polish designs with AI assistance",
      tools: ["Photoshop AI", "Figma AI", "Canva AI", "ChatGPT"],
      tasks: [
        "Refine visual elements and compositions",
        "Generate alternative versions",
        "Optimize for different formats/sizes",
        "Create design variations",
        "Enhance visual quality"
      ],
      aiPrompts: [
        "Suggest improvements to this design for better visual hierarchy and user engagement",
        "Generate 5 variations of this design concept with different color schemes",
        "How can I optimize this design for [specific platform/medium]?"
      ]
    },
    {
      icon: CheckCircle,
      title: "Review & Optimization",
      description: "Evaluate and optimize designs for final delivery",
      tools: ["ChatGPT", "Claude", "Design feedback tools"],
      tasks: [
        "Analyze design effectiveness",
        "Get feedback and suggestions",
        "Optimize for target audience",
        "Ensure brand consistency",
        "Prepare final deliverables"
      ],
      aiPrompts: [
        "Critique this design for [specific criteria] and suggest improvements",
        "How well does this design communicate [key message] to [target audience]?",
        "What are potential issues with this design and how can they be addressed?"
      ]
    }
  ]

  const workflowTypes = [
    {
      type: "Logo Design Workflow",
      steps: [
        "Research brand values and competitor analysis with AI",
        "Generate initial logo concepts using text-to-image AI",
        "Refine concepts based on brand guidelines",
        "Create variations and applications",
        "Test logo effectiveness across different contexts"
      ],
      timeframe: "2-3 days (vs 1-2 weeks traditional)"
    },
    {
      type: "Marketing Campaign Workflow",
      steps: [
        "Develop campaign strategy and messaging with AI",
        "Generate visual concepts and mood boards",
        "Create initial design assets and variations",
        "Adapt designs for multiple channels and formats",
        "Optimize based on performance predictions"
      ],
      timeframe: "1 week (vs 3-4 weeks traditional)"
    },
    {
      type: "Website Design Workflow",
      steps: [
        "Generate wireframes and layout concepts",
        "Create visual design elements and components",
        "Develop responsive design variations",
        "Generate content and copy suggestions",
        "Optimize user experience with AI insights"
      ],
      timeframe: "1-2 weeks (vs 4-6 weeks traditional)"
    },
    {
      type: "Product Design Workflow",
      steps: [
        "Research user needs and market trends with AI",
        "Generate initial product concepts and sketches",
        "Create detailed design specifications",
        "Develop prototypes and user testing materials",
        "Iterate based on AI-powered user feedback analysis"
      ],
      timeframe: "2-3 weeks (vs 6-8 weeks traditional)"
    }
  ]

  const bestPractices = [
    {
      title: "Start with Clear Briefs",
      description: "Provide detailed, specific prompts to get better AI outputs",
      tips: [
        "Include style references and mood descriptions",
        "Specify dimensions, colors, and technical requirements",
        "Describe the target audience and use case",
        "Mention any constraints or limitations"
      ]
    },
    {
      title: "Iterate and Refine",
      description: "Use AI as a starting point, then apply your creative expertise",
      tips: [
        "Generate multiple variations before choosing direction",
        "Combine elements from different AI outputs",
        "Apply your design principles to AI-generated content",
        "Use AI suggestions as inspiration, not final solutions"
      ]
    },
    {
      title: "Maintain Creative Control",
      description: "Keep human creativity and judgment at the center of your process",
      tips: [
        "Review all AI outputs for brand consistency",
        "Ensure designs meet accessibility standards",
        "Verify that concepts align with project goals",
        "Add your unique creative perspective to AI suggestions"
      ]
    },
    {
      title: "Build Efficient Workflows",
      description: "Create repeatable processes that maximize AI benefits",
      tips: [
        "Develop prompt libraries for common design tasks",
        "Create templates for different project types",
        "Establish quality control checkpoints",
        "Document what works for future reference"
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Creative AI Workflow", href: "/resources/creative-ai-workflow", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Creative AI Workflow Guide
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Integrate AI tools seamlessly into your creative design process
          </p>
          <Badge variant="secondary" className="mt-4">
            For Designers & Creatives
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Transform Your Creative Process</CardTitle>
            <CardDescription>
              Learn how to enhance creativity and productivity with AI-powered design workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              AI tools are revolutionizing creative workflows by accelerating ideation, automating 
              repetitive tasks, and enabling rapid iteration. This guide shows you how to integrate 
              AI into your design process while maintaining creative control and producing 
              high-quality, original work.
            </p>
            <p>
              The key is to use AI as a creative partner that enhances your capabilities rather 
              than replacing your artistic vision. With the right workflow, you can increase 
              productivity by 300-500% while maintaining or even improving creative quality.
            </p>
          </CardContent>
        </Card>

        {/* Workflow Stages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI-Enhanced Creative Workflow</h2>
          <div className="space-y-8">
            {workflowStages.map((stage, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <stage.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{stage.title}</CardTitle>
                      <CardDescription>{stage.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-3">Key Tasks:</h4>
                      <ul className="space-y-2">
                        {stage.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Recommended Tools:</h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.tools.map((tool, toolIndex) => (
                            <Badge key={toolIndex} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Example AI Prompts:</h4>
                      <div className="space-y-3">
                        {stage.aiPrompts.map((prompt, promptIndex) => (
                          <div key={promptIndex} className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm font-mono">{prompt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Specific Workflow Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Project-Specific Workflows</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {workflowTypes.map((workflow, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{workflow.type}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="text-xs">
                      {workflow.timeframe}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {workflow.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Practices for Creative AI Workflows</h2>
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{practice.title}</CardTitle>
                  <CardDescription>{practice.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Optimization */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              Continuous Workflow Optimization
            </CardTitle>
            <CardDescription>
              Keep improving your AI-enhanced creative process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Track Performance:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Time saved on different types of projects</li>
                  <li>• Quality improvements in design outputs</li>
                  <li>• Client satisfaction and feedback</li>
                  <li>• Number of iterations required</li>
                  <li>• Creative breakthrough moments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Continuous Learning:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Stay updated with new AI tools and features</li>
                  <li>• Experiment with different prompt techniques</li>
                  <li>• Share learnings with your creative team</li>
                  <li>• Attend AI design workshops and conferences</li>
                  <li>• Build a library of effective prompts and workflows</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Transform Your Creative Workflow?</CardTitle>
            <CardDescription>
              Start implementing AI in your design process today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <Lightbulb className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Week 1</h3>
                <p className="text-sm text-muted-foreground">
                  Choose one AI tool and practice with simple projects
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Layers className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Week 2-3</h3>
                <p className="text-sm text-muted-foreground">
                  Integrate AI into one stage of your existing workflow
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <RefreshCw className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Week 4+</h3>
                <p className="text-sm text-muted-foreground">
                  Expand AI usage and optimize your complete workflow
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}