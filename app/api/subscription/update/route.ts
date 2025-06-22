import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { connectToDatabase } from '@/lib/database/connection'
import { User } from '@/lib/database/models/User'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { customerInfo } = await request.json()
    
    await connectToDatabase()
    
    // Check if user has active premium entitlement
    const hasPremium = customerInfo.entitlements?.premium?.isActive || false
    
    // Update user subscription status
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        subscriptionStatus: hasPremium ? 'active' : 'free',
        subscriptionTier: hasPremium ? 'premium' : 'free',
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      subscription: {
        status: updatedUser.subscriptionStatus,
        tier: updatedUser.subscriptionTier
      }
    })
    
  } catch (error) {
    console.error('Subscription update error:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    )
  }
}