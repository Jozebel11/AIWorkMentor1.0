import { FeedbackForm } from '@/components/feedback/FeedbackForm'
import { ReviewDisplay } from '@/components/feedback/ReviewDisplay'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Star, Bug, Lightbulb, FileText, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Feedback & Reviews - ThriveWithAI',
  description: 'Share your feedback, report issues, request content, and read reviews from other users.',
}

export default function FeedbackPage() {
  const feedbackStats = [
    {
      icon: Star,
      label: 'Reviews',
      count: '1,247',
      description: 'User reviews and ratings',
      color: 'text-yellow-600'
    },
    {
      icon: Bug,
      label: 'Issues Resolved',
      count: '98%',
      description: 'Of reported issues fixed',
      color: 'text-red-600'
    },
    {
      icon: Lightbulb,
      label: 'Features Added',
      count: '156',
      description: 'From user suggestions',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      label: 'Content Requests',
      count: '89%',
      description: 'Fulfilled within 30 days',
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="h-4 w-4 mr-1" />
            Community Feedback
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Help Us Improve ThriveWithAI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Your feedback drives our development. Share your experience, report issues, 
            request new content, or suggest features to help us build the best AI productivity platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {feedbackStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.count}</div>
                    <div className="text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Feedback Form */}
          <div>
            <FeedbackForm />
          </div>

          {/* Recent Reviews */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Recent Reviews
                </CardTitle>
                <CardDescription>
                  See what other users are saying about ThriveWithAI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewDisplay limit={5} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We typically respond to feedback within 24-48 hours. Critical issues are addressed immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Privacy Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your feedback helps improve our platform. Personal information is kept confidential and secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-600" />
                Feature Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Great ideas come from our community. We regularly implement user-suggested features and improvements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}