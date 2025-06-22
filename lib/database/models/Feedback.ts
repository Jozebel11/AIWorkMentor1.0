import mongoose, { Document, Schema } from 'mongoose'

export interface IFeedback extends Document {
  _id: string
  userId?: string
  userEmail: string
  userName: string
  type: 'review' | 'issue' | 'content_request' | 'feature_request' | 'bug_report'
  category: string
  title: string
  description: string
  rating?: number // 1-5 stars for reviews
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_review' | 'in_progress' | 'resolved' | 'closed'
  tags: string[]
  attachments?: string[]
  relatedPage?: string
  relatedJob?: string
  relatedTool?: string
  adminNotes?: string
  adminResponse?: string
  respondedAt?: Date
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  isHelpful?: number // For tracking if other users found this helpful
  upvotes: number
  downvotes: number
}

const FeedbackSchema = new Schema<IFeedback>({
  userId: {
    type: String,
    required: false,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['review', 'issue', 'content_request', 'feature_request', 'bug_report'],
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: function() {
      return this.type === 'review'
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_review', 'in_progress', 'resolved', 'closed'],
    default: 'pending',
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    type: String
  }],
  relatedPage: {
    type: String,
    trim: true
  },
  relatedJob: {
    type: String,
    trim: true
  },
  relatedTool: {
    type: String,
    trim: true
  },
  adminNotes: {
    type: String,
    maxlength: 1000
  },
  adminResponse: {
    type: String,
    maxlength: 1000
  },
  respondedAt: {
    type: Date
  },
  isPublic: {
    type: Boolean,
    default: function() {
      return this.type === 'review'
    }
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes for performance
FeedbackSchema.index({ type: 1, status: 1 })
FeedbackSchema.index({ createdAt: -1 })
FeedbackSchema.index({ rating: -1 })
FeedbackSchema.index({ isPublic: 1, type: 1 })
FeedbackSchema.index({ relatedJob: 1 })
FeedbackSchema.index({ relatedTool: 1 })

export const Feedback = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema)