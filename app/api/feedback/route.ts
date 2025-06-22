import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { connectToDatabase } from '@/lib/database/connection'
import { Feedback } from '@/lib/database/models/Feedback'
import { feedbackSchema } from '@/lib/validation/feedback'
import { EmailService } from '@/lib/services/EmailService'
import { CMSService } from '@/lib/services/CMSService'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = feedbackSchema.parse(body)
    
    await connectToDatabase()
    
    // Create feedback entry
    const feedback = new Feedback({
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      ...validatedData
    })
    
    await feedback.save()
    
    // Send email notification to admin
    try {
      await EmailService.sendFeedbackNotification(feedback)
    } catch (error) {
      console.error('Failed to send email notification:', error)
      // Don't fail the request if email fails
    }
    
    // Send to CMS platform
    try {
      await CMSService.sendToCMS(feedback)
    } catch (error) {
      console.error('Failed to send to CMS:', error)
      // Don't fail the request if CMS integration fails
    }
    
    return NextResponse.json(
      { 
        message: 'Feedback submitted successfully',
        feedbackId: feedback._id
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Feedback submission error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    await connectToDatabase()
    
    const filter: any = {}
    if (type) filter.type = type
    if (status) filter.status = status
    
    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-adminNotes -adminResponse') // Don't expose admin fields
    
    const total = await Feedback.countDocuments(filter)
    
    return NextResponse.json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}