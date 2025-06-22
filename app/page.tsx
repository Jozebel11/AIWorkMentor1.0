import { Hero } from "@/components/ui/hero"
import { FeaturedJobs } from "@/components/ui/featured-jobs"
import { FeaturedTools } from "@/components/ui/featured-tools"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: 'ThriveWithAI - Master AI Tools for Career Success | AI Productivity Training',
  description: 'Learn how to thrive with AI tools instead of fearing job displacement. Comprehensive guides, tutorials, and resources to boost your productivity and advance your career using artificial intelligence.',
}

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Mission Statement Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Embrace AI, Don't Fear It
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We believe AI is not here to replace you—it's here to empower you. Our mission is to help professionals 
              like you learn how to leverage AI tools to enhance your skills, boost productivity, and advance your career 
              in the age of artificial intelligence.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Skill Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Learn to use AI tools that amplify your existing skills and make you more valuable in your field.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Career Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Position yourself as an AI-savvy professional ready for the future of work.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Productivity Boost</h3>
                <p className="text-sm text-muted-foreground">
                  Automate routine tasks and focus on high-value work that truly matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedJobs />
      
      <FeaturedTools />
      
      {/* How it works section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How ThriveWithAI Works</h2>
            <p className="mt-2 text-muted-foreground">
              Our step-by-step approach to mastering AI tools for your profession
            </p>
          </div>
          
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M6 8a5 5 0 0 1 11.9-1H18a1 1 0 0 1 1 1v9" />
                  <path d="M5 15v1a3 3 0 0 0 3 3h12" />
                  <path d="m9 10-2 2 2 2" />
                  <path d="m13 10 2 2-2 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium">1. Find Your Profession</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start by browsing or searching for your profession to discover relevant AI applications and use cases.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-medium">2. Learn with Detailed Guides</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Follow our comprehensive, step-by-step guides tailored specifically for your field and skill level.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium">3. Implement & Thrive</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Apply what you've learned to your daily work and watch your productivity and career prospects soar.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/jobs">Start Your AI Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Join Thousands Who Are Already Thriving</h2>
            <p className="mt-2 text-muted-foreground">
              Professionals across industries are using AI to enhance their careers
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sarah, Marketing Manager</CardTitle>
                <CardDescription>"Increased campaign efficiency by 300%"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "ThriveWithAI taught me how to use AI for content creation and data analysis. 
                  I now create campaigns in hours instead of days, and my results have never been better."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mike, Software Developer</CardTitle>
                <CardDescription>"Coding productivity doubled overnight"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "The AI coding guides here are incredible. I learned to use GitHub Copilot and ChatGPT 
                  effectively, and now I ship features twice as fast while writing better code."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lisa, Teacher</CardTitle>
                <CardDescription>"Lesson planning made effortless"</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "AI has transformed how I create lessons and provide feedback. I save 10+ hours per week 
                  and can focus more on what matters most—my students."
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/about">Learn More About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}