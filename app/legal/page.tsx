import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Shield, Eye, AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Legal Information - AI Productivity",
  description: "Access our legal documents including privacy policy, terms of service, and important disclaimers.",
}

export default function LegalPage() {
  const legalDocuments = [
    {
      title: "Privacy Policy",
      description: "Learn how we collect, use, and protect your personal information",
      icon: Shield,
      href: "/legal/privacy-policy",
      color: "bg-blue-500"
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions for using our platform and services",
      icon: Scale,
      href: "/legal/terms-of-service",
      color: "bg-green-500"
    },
    {
      title: "Disclaimer",
      description: "Important disclaimers and limitations regarding our content",
      icon: AlertTriangle,
      href: "/legal/disclaimer",
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Legal Information
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Important legal documents and policies for our platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {legalDocuments.map((doc, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-3 ${doc.color}/10`}>
                    <doc.icon className={`h-6 w-6 ${doc.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  href={doc.href}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read document →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Legal Summary</CardTitle>
            <CardDescription>
              Key points about using our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <h3>What We Do</h3>
            <p>
              AI Productivity provides educational content, guides, and resources about using AI tools 
              effectively. We help users understand AI capabilities, learn best practices, and discover 
              relevant tools for their profession.
            </p>

            <h3>Your Privacy</h3>
            <p>
              We respect your privacy and are committed to protecting your personal information. We collect 
              minimal data necessary to provide our services and never sell your information to third parties.
            </p>

            <h3>Our Content</h3>
            <p>
              Our content is provided for educational purposes. While we strive for accuracy, the rapidly 
              evolving AI field means information may become outdated. Always verify important information 
              and consult professionals for specific advice.
            </p>

            <h3>Third-Party Tools</h3>
            <p>
              We provide information about third-party AI tools but are not responsible for their performance, 
              availability, or policies. Your use of external tools is governed by their respective terms 
              and conditions.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have questions about our legal policies or need clarification about any aspect of our 
              service, please contact us at legal@aiproductivity.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}