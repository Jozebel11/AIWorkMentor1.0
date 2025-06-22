import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/database/connection'
import { User } from '@/lib/database/models/User'
import { signUpSchema } from '@/lib/auth/validation'
import { RevenueCatService } from '@/lib/subscription/revenuecat'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = signUpSchema.parse(body)
    
    await connectToDatabase()
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: validatedData.email.toLowerCase() 
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    
    // Create user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      subscriptionStatus: 'free',
      subscriptionTier: 'free'
    })
    
    await user.save()
    
    // Create RevenueCat customer
    try {
      const revenueCatCustomer = await RevenueCatService.createCustomer(
        user._id.toString(),
        user.email
      )
      
      user.revenueCatUserId = user._id.toString()
      await user.save()
    } catch (error) {
      console.error('Failed to create RevenueCat customer:', error)
      // Continue without RevenueCat - user can still use free tier
    }
    
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Signup error:', error)
    
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