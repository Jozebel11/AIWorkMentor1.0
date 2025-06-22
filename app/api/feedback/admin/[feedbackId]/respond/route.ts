import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { connectToDatabase } from '@/lib/database/connection'
import { Feedback } from '@/lib/database/models/Feedback'
import { EmailService } from '@/lib/services/EmailService'
import { CMSService } from '@/lib/services/CMSService'
import { feedbackResponseSchema } from '@/lib/validation/feedback'

export async function POST(
  request: NextRequest,
  { params }: { params: { feedbackId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin (you'll need to implement admin role checking)
    if (!session?.user || !isAdmin(session.user)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = feedbackResponseSchema.parse(body)

    await connectToDatabase()
    
    const feedback = await Feedback.findByIdAndUpdate(
      params.feedbackId,
      {
        status: validatedData.status,
        adminResponse: validatedData.response,
        adminNotes: validatedData.adminNotes,
        respondedAt: new Date()
      },
      { new: true }
    )
    
    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      )
    }
    
    // Send response email to user
    try {
      await EmailService.sendFeedbackResponse(feedback, validatedData.response)
    } catch (error) {
      console.error('Failed to send response email:', error)
    }
    
    // Update status in HubSpot
    try {
      await CMSService.updateHubSpotFeedbackStatus(
        params.feedbackId, 
        validatedData.status, 
        validatedData.response
      )
    } catch (error) {
      console.error('Failed to update HubSpot status:', error)
    }
    
    return NextResponse.json({
      message: 'Response sent successfully',
      feedback
    })
    
  } catch (error) {
    console.error('Error responding to feedback:', error)
    
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

// Helper function to check if user is admin
function isAdmin(user: any): boolean {
  // Implement your admin checking logic here
  // This could check user role, email domain, etc.
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(user.email)
}