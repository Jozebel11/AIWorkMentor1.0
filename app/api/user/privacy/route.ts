import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { connectToDatabase } from '@/lib/database/connection'
import { User } from '@/lib/database/models/User'
import { z } from 'zod'

const updatePrivacySchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  activityTracking: z.boolean(),
  dataCollection: z.boolean()
})

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updatePrivacySchema.parse(body)

    await connectToDatabase()
    
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        'preferences.privacy': validatedData,
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
      privacy: validatedData
    })
    
  } catch (error) {
    console.error('Privacy update error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update privacy settings' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    
    const user = await User.findById(session.user.id).select('preferences.privacy')

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      privacy: user.preferences?.privacy || {
        profileVisibility: 'private',
        activityTracking: true,
        dataCollection: true
      }
    })
    
  } catch (error) {
    console.error('Privacy fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch privacy settings' },
      { status: 500 }
    )
  }
}