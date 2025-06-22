'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Star, Loader2, MessageSquare, Bug, Lightbulb, FileText, AlertTriangle } from 'lucide-react'
import { feedbackSchema, FeedbackFormData } from '@/lib/validation/feedback'
import { toast } from 'sonner'

const feedbackTypes = [
  {
    value: 'review',
    label: 'Review',
    description: 'Share your experience with our platform',
    icon: Star,
    color: 'text-yellow-600'
  },
  {
    value: 'issue',
    label: 'Report Issue',
    description: 'Report a problem or bug you encountered',
    icon: Bug,
    color: 'text-red-600'
  },
  {
    value: 'content_request',
    label: 'Content Request',
    description: 'Request new content, guides, or resources',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    value: 'feature_request',
    label: 'Feature Request',
    description: 'Suggest new features or improvements',
    icon: Lightbulb,
    color: 'text-green-600'
  },
  {
    value: 'bug_report',
    label: 'Bug Report',
    description: 'Report technical issues or errors',
    icon: AlertTriangle,
    color: 'text-orange-600'
  }
]

const categories = {
  review: ['Overall Experience', 'Content Quality', 'User Interface', 'Performance', 'Support'],
  issue: ['Login/Authentication', 'Payment/Subscription', 'Content Access', 'Performance', 'Other'],
  content_request: ['New Job Category', 'Additional Prompts', 'More Tools', 'Advanced Guides', 'Video Content'],
  feature_request: ['User Interface', 'Mobile App', 'Integrations', 'Analytics', 'Collaboration'],
  bug_report: ['Page Loading', 'Broken Links', 'Display Issues', 'Functionality', 'Data Loss']
}

interface FeedbackFormProps {
  relatedJob?: string
  relatedTool?: string
  onSuccess?: () => void
}

export function FeedbackForm({ relatedJob, relatedTool, onSuccess }: FeedbackFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      relatedPage: pathname,
      relatedJob,
      relatedTool,
      priority: 'medium',
      isPublic: false,
      tags: []
    }
  })

  const watchedType = watch('type')
  const watchedRating = watch('rating')

  const onSubmit = async (data: FeedbackFormData) => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit feedback')
      }

      toast.success('Feedback submitted successfully! We\'ll review it and get back to you.')
      
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/feedback/success')
      }
    } catch (error) {
      console.error('Feedback submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit feedback')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>
            Please sign in to submit feedback and help us improve the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/auth/signin')}>
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Share Your Feedback
        </CardTitle>
        <CardDescription>
          Help us improve ThriveWithAI by sharing your thoughts, reporting issues, or requesting new content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Feedback Type Selection */}
          <div className="space-y-3">
            <Label>What type of feedback would you like to share?</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {feedbackTypes.map((type) => (
                <div
                  key={type.value}
                  className={`relative cursor-pointer rounded-lg border p-4 transition-all hover:border-primary/50 ${
                    watchedType === type.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => {
                    setValue('type', type.value as any)
                    setSelectedType(type.value)
                  }}
                >
                  <div className="flex items-start gap-3">
                    <type.icon className={`h-5 w-5 ${type.color}`} />
                    <div className="flex-1">
                      <h3 className="font-medium">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    value={type.value}
                    {...register('type')}
                    className="absolute inset-0 opacity-0"
                  />
                </div>
              ))}
            </div>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          {/* Category Selection */}
          {watchedType && (
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories[watchedType as keyof typeof categories]?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>
          )}

          {/* Rating for Reviews */}
          {watchedType === 'review' && (
            <div className="space-y-2">
              <Label>Overall Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue('rating', star)}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (watchedRating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-sm text-destructive">{errors.rating.message}</p>
              )}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief summary of your feedback"
              {...register('title')}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your feedback..."
              rows={5}
              {...register('description')}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Priority for Issues/Bugs */}
          {(watchedType === 'issue' || watchedType === 'bug_report') && (
            <div className="space-y-3">
              <Label>Priority Level</Label>
              <RadioGroup
                defaultValue="medium"
                onValueChange={(value) => setValue('priority', value as any)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low - Minor issue, not urgent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium - Moderate impact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High - Significant impact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">Urgent - Critical issue</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Public Visibility for Reviews */}
          {watchedType === 'review' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublic"
                onCheckedChange={(checked) => setValue('isPublic', !!checked)}
              />
              <Label htmlFor="isPublic" className="text-sm">
                Make this review public (it may be displayed on our website)
              </Label>
            </div>
          )}

          {/* Context Information */}
          {(relatedJob || relatedTool || pathname) && (
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">Context Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                {pathname && <p>Page: {pathname}</p>}
                {relatedJob && <p>Related Job: {relatedJob}</p>}
                {relatedTool && <p>Related Tool: {relatedTool}</p>}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}