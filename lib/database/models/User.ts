import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  password?: string // Optional for OAuth users
  name: string
  image?: string
  subscriptionStatus: 'free' | 'active' | 'expired' | 'cancelled'
  subscriptionTier: 'free' | 'premium'
  revenueCatUserId?: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  emailVerified: boolean
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  preferences?: {
    notifications?: {
      emailNotifications: boolean
      pushNotifications: boolean
      weeklyDigest: boolean
      productUpdates: boolean
    }
    privacy?: {
      profileVisibility: 'public' | 'private' | 'friends'
      activityTracking: boolean
      dataCollection: boolean
    }
    appearance?: {
      theme: 'light' | 'dark' | 'system'
      language: string
    }
  }
  oauth?: {
    google?: {
      id: string
      email: string
    }
    apple?: {
      id: string
      email: string
    }
    azure?: {
      id: string
      email: string
    }
  }
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: false, // Not required for OAuth users
    select: false // Don't include password in queries by default
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false
  },
  subscriptionStatus: {
    type: String,
    enum: ['free', 'active', 'expired', 'cancelled'],
    default: 'free'
  },
  subscriptionTier: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  revenueCatUserId: {
    type: String,
    unique: true,
    sparse: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLoginAt: {
    type: Date
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  preferences: {
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: false },
      weeklyDigest: { type: Boolean, default: true },
      productUpdates: { type: Boolean, default: true }
    },
    privacy: {
      profileVisibility: { 
        type: String, 
        enum: ['public', 'private', 'friends'], 
        default: 'private' 
      },
      activityTracking: { type: Boolean, default: true },
      dataCollection: { type: Boolean, default: true }
    },
    appearance: {
      theme: { 
        type: String, 
        enum: ['light', 'dark', 'system'], 
        default: 'system' 
      },
      language: { type: String, default: 'en' }
    }
  },
  oauth: {
    google: {
      id: String,
      email: String
    },
    apple: {
      id: String,
      email: String
    },
    azure: {
      id: String,
      email: String
    }
  }
}, {
  timestamps: true
})

// Remove duplicate indexes - only create them once
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ revenueCatUserId: 1 }, { unique: true, sparse: true })
UserSchema.index({ subscriptionStatus: 1 })
UserSchema.index({ 'oauth.google.id': 1 }, { sparse: true })
UserSchema.index({ 'oauth.apple.id': 1 }, { sparse: true })
UserSchema.index({ 'oauth.azure.id': 1 }, { sparse: true })

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)