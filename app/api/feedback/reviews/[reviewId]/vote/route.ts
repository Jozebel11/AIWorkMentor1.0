import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { connectToDatabase } from '@/lib/database/connection'
import { Feedback } from '@/lib/database/models/Feedback'

export async function POST(
  request: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { type } = await request.json()
    
    if (!['up', 'down'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    await connectToDatabase()
    
    const updateField = type === 'up' ? 'upvotes' : 'downvotes'
    
    const feedback = await Feedback.findByIdAndUpdate(
      params.reviewId,
      { $inc: { [updateField]: 1 } },
      { new: true }
    )
    
    if (!feedback) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error voting on review:', error)
    return NextResponse.json(
      { error: 'Failed to vote on review' },
      { status: 500 }
    )
  }
}