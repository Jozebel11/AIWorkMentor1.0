import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Privacy Policy - AI Productivity",
  description: "Learn how we collect, use, and protect your personal information when you use our AI productivity platform.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Legal", href: "/legal" },
          { label: "Privacy Policy", href: "/legal/privacy-policy", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
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
              <CardTitle>Introduction</CardTitle>
              <CardDescription>
                Our commitment to protecting your privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                At AI Productivity ("we," "our," or "us"), we are committed to protecting your privacy and 
                ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p>
                By using our website and services, you consent to the data practices described in this policy. 
                If you do not agree with the practices described in this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
              <CardDescription>
                Types of information we may collect from you
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Information You Provide Directly</h3>
              <ul>
                <li>Contact information (name, email address) when you contact us</li>
                <li>Feedback and comments you provide</li>
                <li>Information you submit through forms or surveys</li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address and general location information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
                <li>Device information and screen resolution</li>
              </ul>

              <h3>Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                These may include:
              </p>
              <ul>
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand how you use our site</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
              <CardDescription>
                The purposes for which we process your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>To provide, maintain, and improve our website and services</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze website usage and optimize user experience</li>
                <li>To send you updates about our services (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud or abuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
              <CardDescription>
                When and how we may share your information
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              
              <h3>Service Providers</h3>
              <p>
                We may share information with trusted third-party service providers who assist us in operating 
                our website and providing our services, such as:
              </p>
              <ul>
                <li>Web hosting and content delivery services</li>
                <li>Analytics providers</li>
                <li>Email service providers</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>We may disclose your information if required to do so by law or in response to:</p>
              <ul>
                <li>Valid legal processes (subpoenas, court orders)</li>
                <li>Government requests</li>
                <li>Protection of our rights, property, or safety</li>
                <li>Protection of our users or the public</li>
              </ul>

              <h3>Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                as part of that transaction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
              <CardDescription>
                How we protect your information
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                These measures include:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
              <CardDescription>
                Your control over your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              
              <h3>Access and Portability</h3>
              <ul>
                <li>Request access to your personal information</li>
                <li>Receive a copy of your data in a portable format</li>
              </ul>

              <h3>Correction and Deletion</h3>
              <ul>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
              </ul>

              <h3>Processing Restrictions</h3>
              <ul>
                <li>Object to certain types of processing</li>
                <li>Request restriction of processing</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>

              <h3>Cookie Controls</h3>
              <p>
                You can control cookies through your browser settings. Note that disabling certain cookies 
                may affect website functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Links</CardTitle>
              <CardDescription>
                External websites and services
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                Our website may contain links to third-party websites and services, including AI tools and 
                platforms we recommend. We are not responsible for the privacy practices or content of these 
                external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
              <p>
                When you use external AI tools through links on our site, your interactions with those tools 
                are governed by their respective privacy policies and terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
              <CardDescription>
                Protection of minors' information
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                Our services are not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected personal 
                information from a child under 13, we will take steps to delete such information promptly.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided us with personal information, 
                please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
              <CardDescription>
                How we handle policy updates
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul>
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Notify users of significant changes through our website</li>
                <li>Obtain consent for material changes where required by law</li>
              </ul>
              <p>
                We encourage you to review this policy periodically to stay informed about how we protect 
                your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                How to reach us with privacy questions
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@aiproductivity.com</li>
                <li>Address: [Your Business Address]</li>
              </ul>
              <p>
                We will respond to your inquiry within a reasonable timeframe and in accordance with applicable law.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}