import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Embrace the AI Revolution
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Don't Fear AI—
            <span className="text-primary"> Thrive With It</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Master AI tools to boost your productivity, enhance your skills, and future-proof your career. 
            Join thousands of professionals who are using AI to get ahead, not left behind.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/jobs">
                Find AI Tools for Your Job
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources/getting-started">
                Start Learning Today
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Trusted by professionals at leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-sm font-medium">Microsoft</div>
              <div className="text-sm font-medium">Google</div>
              <div className="text-sm font-medium">Amazon</div>
              <div className="text-sm font-medium">Meta</div>
              <div className="text-sm font-medium">Apple</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    </section>
  )
}