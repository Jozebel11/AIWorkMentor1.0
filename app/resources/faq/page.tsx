import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Lightbulb, Shield, Zap } from "lucide-react"

export const metadata = {
  title: "Frequently Asked Questions - AI Productivity",
  description: "Get answers to common questions about using AI tools for productivity and professional development.",
}

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Lightbulb,
      color: "bg-blue-500",
      questions: [
        {
          question: "What are AI productivity tools?",
          answer: "AI productivity tools are software applications that use artificial intelligence to help you work more efficiently. They can assist with writing, coding, design, research, data analysis, and many other tasks. Examples include ChatGPT for writing assistance, GitHub Copilot for coding, and DALL-E for image generation."
        },
        {
          question: "Do I need technical knowledge to use AI tools?",
          answer: "No, most modern AI tools are designed to be user-friendly and don't require technical expertise. You interact with them using natural language (regular conversation), and they provide helpful responses. However, learning some best practices for prompting can significantly improve your results."
        },
        {
          question: "Which AI tool should I start with?",
          answer: "Start with a general-purpose language model like ChatGPT or Claude, as they're versatile and can help with many different tasks. Once you're comfortable, explore specialized tools based on your specific needs (design, coding, research, etc.). Our job-specific guides can help you choose the right tools for your profession."
        },
        {
          question: "Are AI tools expensive?",
          answer: "Many AI tools offer free tiers that are sufficient for getting started. Paid plans typically range from $10-30 per month and offer additional features, higher usage limits, and priority access. Consider starting with free versions to understand your needs before upgrading."
        }
      ]
    },
    {
      title: "Usage and Best Practices",
      icon: Zap,
      color: "bg-green-500",
      questions: [
        {
          question: "How do I write effective prompts?",
          answer: "Effective prompts are specific, clear, and provide context. Include details about what you want, the format you prefer, your target audience, and any constraints. For example, instead of 'write about marketing,' try 'write a 500-word blog post about email marketing for small businesses, focusing on subject lines and personalization.'"
        },
        {
          question: "Can AI tools replace human workers?",
          answer: "AI tools are designed to augment human capabilities, not replace them. They excel at specific tasks like generating first drafts, analyzing data patterns, or providing suggestions, but they lack human judgment, creativity, and contextual understanding. The most effective approach is using AI to enhance your work while maintaining human oversight."
        },
        {
          question: "How accurate are AI-generated outputs?",
          answer: "AI accuracy varies by task and tool. While AI is excellent at many tasks, it can make mistakes, especially with factual information, recent events, or specialized knowledge. Always verify important information, fact-check claims, and review outputs before using them in critical situations."
        },
        {
          question: "Can I use AI for commercial work?",
          answer: "Most AI tools allow commercial use, but terms vary by provider. Check the specific terms of service for each tool you use. Some considerations include: disclosure requirements, intellectual property rights, and client preferences. When in doubt, be transparent about AI assistance in your work."
        }
      ]
    },
    {
      title: "Ethics and Safety",
      icon: Shield,
      color: "bg-purple-500",
      questions: [
        {
          question: "Is it ethical to use AI for my work?",
          answer: "Using AI ethically depends on how you use it. Key principles include: being transparent about AI assistance when required, maintaining human oversight, verifying accuracy, respecting intellectual property, and not using AI to deceive or harm others. Our ethics guide provides detailed guidelines."
        },
        {
          question: "Do I need to disclose when I use AI?",
          answer: "Disclosure requirements vary by context. In academic settings, many institutions require disclosure. In professional work, check your organization's policies and client contracts. When in doubt, transparency is usually the best approach. Always disclose when specifically asked or when it's required by policy."
        },
        {
          question: "How do I protect my privacy when using AI tools?",
          answer: "Read privacy policies carefully, avoid sharing sensitive personal or business information, use business accounts when available, and consider data retention policies. Many AI providers use conversations to improve their models, so be cautious about confidential information."
        },
        {
          question: "What about bias in AI outputs?",
          answer: "AI tools can reflect biases present in their training data. Be aware of this possibility, especially when dealing with topics related to people, cultures, or sensitive subjects. Seek diverse perspectives, question outputs that seem biased, and use your judgment to ensure fair and inclusive outcomes."
        }
      ]
    },
    {
      title: "Technical Questions",
      icon: HelpCircle,
      color: "bg-orange-500",
      questions: [
        {
          question: "Why do I sometimes get different answers to the same question?",
          answer: "AI models use probabilistic generation, meaning they don't always produce identical outputs. Factors like slight variations in phrasing, conversation history, and the model's random sampling can lead to different responses. This is normal and often beneficial for creative tasks."
        },
        {
          question: "What should I do if an AI tool isn't working as expected?",
          answer: "Try rephrasing your prompt, being more specific about what you want, breaking complex requests into smaller parts, or providing examples. If technical issues persist, check the tool's status page, try refreshing/restarting, or contact their support team."
        },
        {
          question: "Can AI tools access the internet?",
          answer: "This varies by tool. Some AI models have internet access and can browse current information, while others are trained on data up to a certain date and can't access real-time information. Check each tool's capabilities and limitations in their documentation."
        },
        {
          question: "How do I keep up with new AI tools and features?",
          answer: "Follow AI tool providers on social media, subscribe to their newsletters, join relevant communities and forums, and regularly check our tools directory for updates. The AI field moves quickly, so staying informed helps you take advantage of new capabilities."
        }
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "FAQ", href: "/resources/faq", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Get answers to common questions about AI productivity tools
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Quick Answers to Common Questions</CardTitle>
            <CardDescription>
              Find answers to the most frequently asked questions about using AI tools effectively and responsibly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Whether you're just getting started with AI tools or looking to solve specific challenges, 
              this FAQ covers the most common questions we receive. If you can't find what you're looking for, 
              feel free to explore our other resources or reach out for support.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${category.color.replace('bg-', 'bg-')}/10`}>
                    <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <Badge variant="outline">{category.questions.length} questions</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still have questions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Here are some additional resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg border">
                <Lightbulb className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive guide for AI beginners
                </p>
                <a href="/resources/getting-started" className="text-primary hover:underline text-sm">
                  Read the guide →
                </a>
              </div>
              <div className="text-center p-4 rounded-lg border">
                <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Advanced tips and strategies
                </p>
                <a href="/resources/best-practices" className="text-primary hover:underline text-sm">
                  Learn more →
                </a>
              </div>
              <div className="text-center p-4 rounded-lg border">
                <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Ethics Guidelines</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Responsible AI usage principles
                </p>
                <a href="/resources/ai-ethics" className="text-primary hover:underline text-sm">
                  View guidelines →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}