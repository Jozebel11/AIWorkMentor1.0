import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, Crown } from "lucide-react"
import { CopyButton } from "@/components/ui/copy-button"
import { UseCaseCard } from "@/components/ui/use-case-card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { SubscriptionGate } from "@/components/subscription/SubscriptionGate"
import type { Job, UseCase, JobPromptStructure } from "@/lib/database/supabase"

interface JobDetailsViewProps {
  job: Job & { promptStructures?: JobPromptStructure[] }
  useCases: UseCase[]
  additionalResources: Array<{
    title: string
    description: string
    href: string
    external: boolean
  }>
}

export default function JobDetailsView({ job, useCases, additionalResources }: JobDetailsViewProps) {
  return (
    <div>
      {/* Hero section */}
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={job.image}
          alt={job.title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        <div className="container relative flex h-full flex-col justify-end pb-8">
          <Breadcrumb
            items={[
              { label: "Jobs", href: "/jobs" },
              { label: job.title, href: `/jobs/${job.id}`, current: true }
            ]}
            className="mb-2"
          />
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            AI Guide for {job.title}s
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 md:text-lg">
            {job.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} className="bg-white/20 text-white hover:bg-white/30">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {/* Introduction Section */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Why AI Matters for {job.title}s</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground">
              As a {job.title.toLowerCase()}, you're at the forefront of an exciting transformation.
              AI tools aren't here to replace your expertise—they're here to amplify it. By learning
              to work alongside AI, you can automate routine tasks, enhance your creative output,
              and focus on the high-value work that truly showcases your skills.
            </p>
            <p className="text-muted-foreground">
              The professionals who thrive in the coming years will be those who embrace AI as a
              powerful ally. This guide will show you exactly how to do that, with practical,
              step-by-step instructions tailored specifically for your field.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold">AI Use Cases for {job.title}s</h2>
          <p className="mt-2 text-muted-foreground">
            Discover practical ways AI can enhance your daily work and accelerate your career growth.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {useCases.map((useCase, index) => (
            <SubscriptionGate
              key={useCase.id}
              requiresPremium={index > 0}
              blurContent={index > 0}
              showUpgradePrompt={false}
              fallback={
                <Card className="relative border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center gap-2">
                          {useCase.title}
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {useCase.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <Badge variant="outline">{useCase.difficulty}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{useCase.time_estimate}</span>
                      </div>
                      <div className="pt-3 border-t">
                        <Button asChild className="w-full">
                          <Link href="/subscription/upgrade">
                            <Crown className="mr-2 h-4 w-4" />
                            Unlock Premium
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              }
            >
              <UseCaseCard
                id={useCase.id}
                jobId={job.id}
                title={useCase.title}
                description={useCase.description}
                difficulty={useCase.difficulty}
                timeEstimate={useCase.time_estimate}
                tools={useCase.tools}
              />
            </SubscriptionGate>
          ))}
        </div>

        {/* Prompt Structures Section */}
        {job.promptStructures && job.promptStructures.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Master AI Prompts for {job.title}s</h2>
              <p className="text-muted-foreground max-w-3xl">
                These proven prompt templates will help you get better results from AI tools.
                Copy and customize them for your specific needs. The highlighted sections show
                where you should input your own information.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {job.promptStructures.map((prompt, index) => (
                <SubscriptionGate
                  key={prompt.id}
                  requiresPremium={index > 0}
                  fallback={
                    <Card className="relative border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg mb-2 flex items-center gap-2">
                              {prompt.title}
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {prompt.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg bg-muted p-4 relative">
                          <div className="blur-sm">
                            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Prompt Template:
                            </div>
                            <div className="whitespace-pre-wrap leading-relaxed font-mono text-sm">
                              {prompt.example.substring(0, 100)}...
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button asChild>
                              <Link href="/subscription/upgrade">
                                <Crown className="mr-2 h-4 w-4" />
                                Unlock Premium
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  }
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">{prompt.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {prompt.description}
                          </CardDescription>
                        </div>
                        <CopyButton text={prompt.example} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                        <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Prompt Template:
                        </div>
                        <div
                          className="whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: prompt.example
                              .replace(/\[([^\]]+)\]/g, '<span class="bg-primary/20 text-primary px-1 py-0.5 rounded font-medium">[$1]</span>')
                              .replace(/•/g, '<span class="text-primary">•</span>')
                          }}
                        />
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        💡 <strong>Tip:</strong> Replace the highlighted sections with your specific information for best results.
                      </div>
                    </CardContent>
                  </Card>
                </SubscriptionGate>
              ))}
            </div>
          </div>
        )}

        {/* Success Metrics Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Measuring Your AI Success
              </CardTitle>
              <CardDescription>
                Track these key metrics to measure how AI is improving your work as a {job.title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Time Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Track hours saved on routine tasks that AI now handles
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Quality Improvement</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor improvements in work quality and consistency
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Output Volume</h4>
                  <p className="text-sm text-muted-foreground">
                    Measure increased productivity and deliverable quantity
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Skill Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Track new capabilities gained through AI collaboration
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Career Advancement</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor promotions, raises, or new opportunities
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Innovation Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Measure creative breakthroughs and novel solutions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional resources */}
        <div className="rounded-lg bg-muted p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4">Additional Resources for {job.title}s</h3>
          <p className="text-muted-foreground mb-6">
            Explore these curated resources to deepen your AI knowledge and stay current with the latest developments in your field.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {additionalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    {resource.external && <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 ml-2" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {resource.description}
                  </p>
                  {resource.external ? (
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Visit Resource →
                    </a>
                  ) : (
                    <Link
                      href={resource.href}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Read More →
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/resources">
                Explore All Resources
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}