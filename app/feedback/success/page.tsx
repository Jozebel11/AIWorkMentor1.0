import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Feedback Submitted - ThriveWithAI',
  description: 'Thank you for your feedback! We\'ll review it and get back to you soon.',
}

export default function FeedbackSuccessPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Feedback Submitted!</CardTitle>
          <CardDescription>
            Thank you for taking the time to share your feedback with us.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• We'll review your feedback within 24-48 hours</li>
              <li>• You'll receive an email confirmation shortly</li>
              <li>• For urgent issues, we'll respond immediately</li>
              <li>• Feature requests are evaluated monthly</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/feedback">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit More Feedback
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need immediate help?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}