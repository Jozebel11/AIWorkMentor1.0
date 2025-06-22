import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Heart, Target, Users, Lightbulb, Zap, Code, Globe, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About ThriveWithAI - Our Mission to Empower Professionals with AI",
  description: "Learn about ThriveWithAI's mission to help professionals embrace AI tools for career growth. Discover our story, values, and how this platform was built with cutting-edge AI technology.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Human-Centered AI",
      description: "We believe AI should enhance human capabilities, not replace them. Our approach puts people first."
    },
    {
      icon: Target,
      title: "Practical Learning",
      description: "Every guide and resource is designed for real-world application with immediate, measurable results."
    },
    {
      icon: Users,
      title: "Inclusive Growth",
      description: "AI literacy should be accessible to everyone, regardless of technical background or industry."
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "We stay at the forefront of AI developments to bring you the latest tools and techniques."
    }
  ]

  const teamMembers = [
    {
      name: "AI Research Team",
      role: "Content Curation & Strategy",
      description: "Our team of AI researchers and industry experts curate the most effective tools and techniques for each profession."
    },
    {
      name: "Education Specialists",
      role: "Learning Experience Design",
      description: "Professional educators who ensure our content is accessible, engaging, and pedagogically sound."
    },
    {
      name: "Industry Practitioners",
      role: "Real-World Validation",
      description: "Working professionals from various fields who test and validate our guides in real workplace scenarios."
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "About", href: "/about", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">About ThriveWithAI</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Empowering Professionals to Thrive in the AI Era
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to transform how professionals view and use artificial intelligence—
            not as a threat to their careers, but as the ultimate tool for growth, productivity, and success.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-lg">
              <strong>To help every professional embrace AI as their career accelerator.</strong>
            </p>
            <p>
              In a world where AI anxiety is real and widespread, we believe there's a better way forward. 
              Instead of fearing that AI will take your job, we'll show you how to use AI to make yourself 
              indispensable in your field.
            </p>
            <p>
              Our comprehensive guides, tutorials, and resources are designed to help you:
            </p>
            <ul>
              <li><strong>Boost your productivity</strong> by automating routine tasks</li>
              <li><strong>Enhance your skills</strong> with AI-powered tools and techniques</li>
              <li><strong>Stay competitive</strong> in an evolving job market</li>
              <li><strong>Future-proof your career</strong> by becoming AI-literate</li>
              <li><strong>Lead innovation</strong> in your organization</li>
            </ul>
          </CardContent>
        </Card>

        {/* Our Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              ThriveWithAI was born from a simple observation: while AI tools were becoming incredibly powerful 
              and accessible, most professionals were either unaware of their potential or afraid to use them.
            </p>
            <p>
              We saw talented individuals worried about AI taking their jobs, when they could be using these 
              same tools to become more valuable, creative, and productive than ever before. The gap between 
              AI's potential and its practical application in everyday work was enormous.
            </p>
            <p>
              So we set out to bridge that gap. We brought together AI researchers, education specialists, 
              and working professionals from diverse industries to create the most comprehensive, practical, 
              and accessible AI education platform available.
            </p>
            <p>
              Our goal isn't just to teach you about AI—it's to transform how you work, think, and grow 
              in your career. We want you to not just survive the AI revolution, but to thrive in it.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How This Site Was Built */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Code className="h-6 w-6 text-primary" />
              Built with AI: A Meta Example
            </CardTitle>
            <CardDescription>
              This website itself is a testament to the power of AI-human collaboration
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              <strong>ThriveWithAI was built using bolt.new</strong>, an AI-powered development platform that 
              demonstrates exactly what we teach—how AI can amplify human capabilities rather than replace them.
            </p>
            
            <h3 className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              The Development Process
            </h3>
            <p>
              Using bolt.new, we were able to rapidly prototype, design, and develop this comprehensive platform 
              by leveraging AI for:
            </p>
            <ul>
              <li><strong>Code Generation:</strong> AI wrote the foundational code structure</li>
              <li><strong>Design Implementation:</strong> AI helped translate design concepts into responsive layouts</li>
              <li><strong>Content Organization:</strong> AI assisted in structuring information architecture</li>
              <li><strong>Feature Development:</strong> AI accelerated the creation of interactive components</li>
            </ul>

            <h3 className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Human Expertise Remained Essential
            </h3>
            <p>
              While AI handled much of the technical implementation, human expertise was crucial for:
            </p>
            <ul>
              <li><strong>Strategic Vision:</strong> Defining the mission, values, and user experience</li>
              <li><strong>Content Curation:</strong> Selecting and organizing the most valuable AI resources</li>
              <li><strong>Quality Assurance:</strong> Ensuring accuracy, usability, and educational value</li>
              <li><strong>User Experience Design:</strong> Creating intuitive navigation and learning paths</li>
            </ul>

            <h3 className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              The Result
            </h3>
            <p>
              This collaboration between AI tools and human expertise allowed us to create a comprehensive, 
              professional-grade educational platform in a fraction of the time traditional development would require. 
              It's a perfect example of our core philosophy: <strong>AI doesn't replace human creativity and 
              expertise—it amplifies it.</strong>
            </p>
            
            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium mb-2">💡 Key Takeaway:</p>
              <p className="text-sm">
                This website exists because we used AI tools effectively, not because AI replaced human input. 
                The same principle applies to your career—AI can make you more capable, creative, and valuable 
                in your field.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Thrive with AI?</CardTitle>
            <CardDescription>
              Join thousands of professionals who are already using AI to advance their careers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/jobs">Find Your Profession</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources/getting-started">Start Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}