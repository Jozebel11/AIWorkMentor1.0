import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Disclaimer - AI Productivity",
  description: "Important disclaimers and limitations regarding the use of our AI productivity resources and recommendations.",
}

export default function DisclaimerPage() {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Legal", href: "/legal" },
          { label: "Disclaimer", href: "/legal/disclaimer", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Disclaimer
          </h1>
          <p className="mt-4 text-muted-foreground">
            Important limitations and disclaimers
          </p>
          <Badge variant="outline" className="mt-2">
            Last updated: January 2025
          </Badge>
        </div>

        <Card className="mb-8 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <div>
                <CardTitle className="text-orange-600">Important Notice</CardTitle>
                <CardDescription>
                  Please read this disclaimer carefully before using our services
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This disclaimer outlines important limitations regarding the information and recommendations 
              provided on AI Productivity. By using our website and services, you acknowledge and agree 
              to these limitations.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General Information Disclaimer</CardTitle>
              <CardDescription>
                Nature and purpose of our content
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                The information provided on AI Productivity is for general informational and educational 
                purposes only. Our content includes:
              </p>
              <ul>
                <li>Guides and tutorials about AI tools</li>
                <li>Best practices and recommendations</li>
                <li>Job-specific use cases and examples</li>
                <li>Tool reviews and comparisons</li>
              </ul>
              <p>
                This information should not be considered as professional advice tailored to your specific 
                circumstances. Always consult with qualified professionals for advice related to your 
                particular situation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Tool Recommendations</CardTitle>
              <CardDescription>
                Limitations regarding third-party AI tools
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>No Endorsement</h3>
              <p>
                Our mention or review of AI tools does not constitute an endorsement, recommendation, or 
                guarantee of their performance, reliability, or suitability for your needs. We are not 
                affiliated with most of the AI tool providers we discuss.
              </p>

              <h3>Tool Performance</h3>
              <p>
                AI tools are constantly evolving, and their performance, features, and availability may 
                change without notice. We cannot guarantee:
              </p>
              <ul>
                <li>The accuracy or reliability of AI tool outputs</li>
                <li>The continued availability of any specific tool or feature</li>
                <li>The compatibility of tools with your specific use case</li>
                <li>The security or privacy practices of third-party providers</li>
              </ul>

              <h3>Your Responsibility</h3>
              <p>
                You are solely responsible for:
              </p>
              <ul>
                <li>Evaluating AI tools before use</li>
                <li>Understanding the terms of service and privacy policies of AI tools</li>
                <li>Verifying the accuracy of AI-generated outputs</li>
                <li>Ensuring compliance with applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional and Legal Advice</CardTitle>
              <CardDescription>
                What our content does not provide
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                AI Productivity does not provide:
              </p>
              <ul>
                <li>Legal advice or interpretation of laws and regulations</li>
                <li>Professional consulting services</li>
                <li>Technical support for AI tools</li>
                <li>Personalized recommendations for specific business situations</li>
                <li>Financial or investment advice</li>
                <li>Medical or health-related advice</li>
              </ul>
              <p>
                For matters requiring professional expertise, please consult with qualified professionals 
                in the relevant field.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy and Currency of Information</CardTitle>
              <CardDescription>
                Limitations on information accuracy and timeliness
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Rapidly Changing Field</h3>
              <p>
                The field of artificial intelligence is rapidly evolving. Information that is accurate 
                today may become outdated quickly due to:
              </p>
              <ul>
                <li>New AI tool releases and updates</li>
                <li>Changes in AI capabilities and limitations</li>
                <li>Evolving best practices and methodologies</li>
                <li>Regulatory and legal developments</li>
              </ul>

              <h3>No Warranty of Accuracy</h3>
              <p>
                While we strive to provide accurate and up-to-date information, we make no warranties or 
                representations about:
              </p>
              <ul>
                <li>The accuracy, completeness, or reliability of our content</li>
                <li>The timeliness of information provided</li>
                <li>The absence of errors or omissions</li>
                <li>The suitability of information for any particular purpose</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links and Third-Party Content</CardTitle>
              <CardDescription>
                Disclaimers regarding external resources
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Third-Party Websites</h3>
              <p>
                Our website contains links to external websites and resources. We are not responsible for:
              </p>
              <ul>
                <li>The content, accuracy, or availability of external sites</li>
                <li>The privacy practices of third-party websites</li>
                <li>Any damages or losses from your use of external resources</li>
                <li>The terms of service or policies of third-party providers</li>
              </ul>

              <h3>AI Tool Providers</h3>
              <p>
                When you use AI tools through links on our site, your relationship is directly with the 
                tool provider. We are not responsible for:
              </p>
              <ul>
                <li>The performance or reliability of third-party AI tools</li>
                <li>Billing, subscription, or payment issues with AI tool providers</li>
                <li>Data privacy or security practices of AI tool providers</li>
                <li>Customer support for third-party tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ethical and Responsible Use</CardTitle>
              <CardDescription>
                Your responsibility for ethical AI usage
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                While we provide guidance on ethical AI usage, you are ultimately responsible for:
              </p>
              <ul>
                <li>Using AI tools in accordance with applicable laws and regulations</li>
                <li>Respecting intellectual property rights</li>
                <li>Maintaining transparency about AI assistance when required</li>
                <li>Ensuring the accuracy and appropriateness of AI-generated content</li>
                <li>Considering the impact of AI usage on others</li>
              </ul>
              <p>
                Our ethical guidelines are suggestions based on current best practices and should not be 
                considered as legal or professional advice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
              <CardDescription>
                Important limitations on our legal responsibility
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                To the fullest extent permitted by law, AI Productivity disclaims all liability for any 
                damages arising from:
              </p>
              <ul>
                <li>Your use of information provided on our website</li>
                <li>Your use of recommended AI tools or services</li>
                <li>Any errors, omissions, or inaccuracies in our content</li>
                <li>Any decisions made based on our information or recommendations</li>
                <li>Any technical issues or interruptions in our service</li>
              </ul>
              <p>
                This includes, but is not limited to, direct, indirect, incidental, consequential, and 
                punitive damages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Disclaimer</CardTitle>
              <CardDescription>
                How we may modify this disclaimer
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                We reserve the right to update this disclaimer at any time to reflect changes in our 
                services, applicable laws, or industry best practices. Updates will be posted on this 
                page with a revised date.
              </p>
              <p>
                Your continued use of our website after any changes constitutes acceptance of the updated 
                disclaimer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Questions about this disclaimer
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                If you have questions about this disclaimer or need clarification about any of our content, 
                please contact us at:
              </p>
              <ul>
                <li>Email: legal@aiproductivity.com</li>
                <li>Address: [Your Business Address]</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}