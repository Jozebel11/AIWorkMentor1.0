import { getJobById } from "@/lib/data/jobs"
import { getUseCasesByJobId } from "@/lib/data/use-cases"

export class JobController {
  static async getJobDetails(jobId: string) {
    try {
      const job = await getJobById(jobId)
      if (!job) {
        return { job: null, useCases: [], additionalResources: [] }
      }

      const useCases = await getUseCasesByJobId(job.id)
      const additionalResources = this.getAdditionalResources(job.id)

      return {
        job,
        useCases,
        additionalResources
      }
    } catch (error) {
      console.error('Error fetching job details:', error)
      throw new Error('Failed to load job details')
    }
  }

  private static getAdditionalResources(jobId: string) {
    const baseResources = [
      {
        title: "AI Ethics Guidelines",
        description: "Essential ethical considerations for AI usage in your profession",
        href: "/resources/ai-ethics",
        external: false
      },
      {
        title: "Best Practices Guide",
        description: "Advanced techniques for maximizing AI tool effectiveness",
        href: "/resources/best-practices",
        external: false
      }
    ]

    const jobSpecificResources: Record<string, any[]> = {
      teacher: [
        {
          title: "Educational AI Tools Directory",
          description: "Comprehensive list of AI tools specifically for educators",
          href: "https://www.teachertech.com/ai-tools",
          external: true
        },
        {
          title: "AI in Education Research",
          description: "Latest research on AI applications in educational settings",
          href: "https://www.educause.edu/research-and-publications/research/studies/artificial-intelligence",
          external: true
        },
        {
          title: "Classroom AI Implementation Guide",
          description: "Step-by-step guide for introducing AI tools in your classroom",
          href: "/resources/classroom-ai-guide",
          external: false
        }
      ],
      writer: [
        {
          title: "Writer's AI Toolkit",
          description: "Essential AI tools every writer should know about",
          href: "https://www.writersdigest.com/be-inspired/ai-writing-tools",
          external: true
        },
        {
          title: "Content Strategy with AI",
          description: "How to develop content strategies that leverage AI effectively",
          href: "/resources/content-strategy-ai",
          external: false
        },
        {
          title: "AI Writing Ethics",
          description: "Navigating the ethical considerations of AI-assisted writing",
          href: "https://www.poynter.org/ethics-trust/2023/ai-writing-ethics/",
          external: true
        }
      ],
      developer: [
        {
          title: "GitHub Copilot Best Practices",
          description: "Official guide to maximizing GitHub Copilot effectiveness",
          href: "https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot",
          external: true
        },
        {
          title: "AI Code Review Checklist",
          description: "Essential checklist for reviewing AI-generated code",
          href: "/resources/ai-code-review",
          external: false
        },
        {
          title: "Developer AI Tools Comparison",
          description: "Comprehensive comparison of AI development tools",
          href: "/resources/dev-tools-comparison",
          external: false
        }
      ],
      marketer: [
        {
          title: "Marketing AI Tools Database",
          description: "Comprehensive database of AI tools for marketers",
          href: "https://www.marketingtool.directory/ai-tools/",
          external: true
        },
        {
          title: "AI Marketing ROI Calculator",
          description: "Calculate the ROI of implementing AI in your marketing",
          href: "/resources/marketing-roi-calculator",
          external: false
        },
        {
          title: "AI Marketing Case Studies",
          description: "Real-world examples of successful AI marketing implementations",
          href: "/resources/marketing-case-studies",
          external: false
        }
      ],
      designer: [
        {
          title: "AI Design Tools Showcase",
          description: "Latest AI tools transforming the design industry",
          href: "https://www.designtools.cc/ai",
          external: true
        },
        {
          title: "Creative AI Workflow Guide",
          description: "How to integrate AI into your creative workflow",
          href: "/resources/creative-ai-workflow",
          external: false
        },
        {
          title: "AI Design Ethics",
          description: "Ethical considerations for AI-generated design work",
          href: "/resources/design-ethics",
          external: false
        }
      ],
      researcher: [
        {
          title: "Academic AI Tools",
          description: "AI tools specifically designed for academic research",
          href: "https://www.researchgate.net/publication/ai-tools-research",
          external: true
        },
        {
          title: "Research Data Analysis with AI",
          description: "Advanced techniques for AI-powered data analysis",
          href: "/resources/research-data-analysis",
          external: false
        },
        {
          title: "AI Research Methodology",
          description: "Best practices for incorporating AI into research methodology",
          href: "/resources/ai-research-methodology",
          external: false
        }
      ]
    }

    return [...baseResources, ...(jobSpecificResources[jobId] || [])]
  }
}