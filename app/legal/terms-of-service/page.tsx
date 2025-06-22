import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Terms of Service - AI Productivity",
  description: "Read our terms and conditions for using the AI Productivity platform and services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Legal", href: "/legal" },
          { label: "Terms of Service", href: "/legal/terms-of-service", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 2025
          </p>
          <Badge variant="outline" className="mt-2">
            Effective Date: January 1, 2025
          </Badge>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Agreement to Terms</CardTitle>
              <CardDescription>
                Your acceptance of these terms
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                Welcome to AI Productivity ("we," "our," or "us"). These Terms of Service ("Terms") govern 
                your use of our website, services, and content (collectively, the "Service"). By accessing 
                or using our Service, you agree to be bound by these Terms.
              </p>
              <p>
                If you disagree with any part of these Terms, then you may not access the Service. These 
                Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
              <CardDescription>
                What we provide
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>AI Productivity provides:</p>
              <ul>
                <li>Educational content about AI tools and their applications</li>
                <li>Guides and tutorials for using AI tools effectively</li>
                <li>Job-specific AI use cases and best practices</li>
                <li>A directory of AI tools and resources</li>
                <li>Information about AI ethics and responsible usage</li>
              </ul>
              <p>
                Our Service is informational and educational in nature. We do not provide the AI tools 
                themselves but rather guidance on how to use them effectively.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Registration</CardTitle>
              <CardDescription>
                Account creation and management
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                Currently, our Service does not require user registration or account creation. You can 
                access our content and resources without creating an account.
              </p>
              <p>
                If we introduce user accounts in the future, you will be responsible for:
              </p>
              <ul>
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>Notifying us of any unauthorized use of your account</li>
                <li>All activities that occur under your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acceptable Use</CardTitle>
              <CardDescription>
                How you may and may not use our Service
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Permitted Uses</h3>
              <p>You may use our Service to:</p>
              <ul>
                <li>Access and read our educational content</li>
                <li>Learn about AI tools and best practices</li>
                <li>Share our content with proper attribution</li>
                <li>Use our guides for personal or professional development</li>
              </ul>

              <h3>Prohibited Uses</h3>
              <p>You may not use our Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Scrape or automatically extract our content without permission</li>
                <li>Use our Service for any commercial purpose without authorization</li>
                <li>Impersonate us or misrepresent your affiliation with us</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
              <CardDescription>
                Ownership of content and materials
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Our Content</h3>
              <p>
                The Service and its original content, features, and functionality are owned by AI Productivity 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>

              <h3>Your Use of Our Content</h3>
              <p>
                You may view, download, and print our content for personal, non-commercial use, provided you:
              </p>
              <ul>
                <li>Do not modify or alter the content</li>
                <li>Include all copyright and other proprietary notices</li>
                <li>Do not use the content for commercial purposes without permission</li>
                <li>Provide proper attribution when sharing</li>
              </ul>

              <h3>Third-Party Content</h3>
              <p>
                Our Service may include links to third-party AI tools and services. We do not claim ownership 
                of these external resources, and their use is governed by their respective terms and conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimers and Limitations</CardTitle>
              <CardDescription>
                Important limitations on our liability
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Educational Purpose</h3>
              <p>
                Our content is provided for educational and informational purposes only. It should not be 
                considered as professional advice for your specific situation.
              </p>

              <h3>Third-Party Tools</h3>
              <p>
                We provide information about third-party AI tools but do not endorse, guarantee, or take 
                responsibility for their performance, accuracy, or suitability for your needs.
              </p>

              <h3>Accuracy of Information</h3>
              <p>
                While we strive to provide accurate and up-to-date information, the rapidly evolving nature 
                of AI technology means that some information may become outdated. We make no warranties about 
                the accuracy, completeness, or timeliness of our content.
              </p>

              <h3>Service Availability</h3>
              <p>
                We do not guarantee that our Service will be available at all times or free from interruptions, 
                errors, or security vulnerabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
              <CardDescription>
                Limits on our legal responsibility
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                To the fullest extent permitted by applicable law, AI Productivity shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Costs of substitute services</li>
                <li>Damages resulting from use of third-party AI tools</li>
                <li>Any damages arising from your use of our Service</li>
              </ul>
              <p>
                Our total liability for any claims arising from your use of the Service shall not exceed 
                the amount you paid us for the Service in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indemnification</CardTitle>
              <CardDescription>
                Your responsibility for certain claims
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                You agree to defend, indemnify, and hold harmless AI Productivity and its officers, directors, 
                employees, and agents from and against any claims, damages, obligations, losses, liabilities, 
                costs, or debt arising from:
              </p>
              <ul>
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit or transmit through the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
              <CardDescription>
                How these Terms may end
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                We may terminate or suspend your access to our Service immediately, without prior notice or 
                liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                You may stop using our Service at any time. Upon termination, your right to use the Service 
                will cease immediately.
              </p>
              <p>
                The following sections will survive termination: Intellectual Property Rights, Disclaimers 
                and Limitations, Limitation of Liability, Indemnification, and Governing Law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
              <CardDescription>
                Legal jurisdiction and dispute resolution
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Service shall be resolved through 
                binding arbitration in accordance with the rules of [Arbitration Organization], except that 
                either party may seek injunctive relief in court for intellectual property violations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
              <CardDescription>
                How we may modify these Terms
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree 
                to be bound by the revised terms. If you do not agree to the new terms, please stop using 
                the Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How to reach us
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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