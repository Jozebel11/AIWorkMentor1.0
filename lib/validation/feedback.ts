import { z } from 'zod'

export const feedbackSchema = z.object({
  type: z.enum(['review', 'issue', 'content_request', 'feature_request', 'bug_report']),
  category: z.string().min(1, 'Category is required'),
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  tags: z.array(z.string()).default([]),
  relatedPage: z.string().optional(),
  relatedJob: z.string().optional(),
  relatedTool: z.string().optional(),
  isPublic: z.boolean().default(false)
}).refine((data) => {
  // Rating is required for reviews
  if (data.type === 'review' && !data.rating) {
    return false
  }
  return true
}, {
  message: "Rating is required for reviews",
  path: ["rating"]
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>

export const feedbackResponseSchema = z.object({
  feedbackId: z.string(),
  response: z.string()
    .min(10, 'Response must be at least 10 characters')
    .max(1000, 'Response must be less than 1000 characters'),
  status: z.enum(['pending', 'in_review', 'in_progress', 'resolved', 'closed']),
  adminNotes: z.string().max(1000).optional()
})

export type FeedbackResponseData = z.infer<typeof feedbackResponseSchema>