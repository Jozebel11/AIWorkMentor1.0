import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { Feedback } from '@/lib/database/models/Feedback'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const relatedJob = searchParams.get('relatedJob')
    const relatedTool = searchParams.get('relatedTool')
    const limit = parseInt(searchParams.get('limit') || '10')

    await connectToDatabase()
    
    const filter: any = {
      type: 'review',
      isPublic: true,
      rating: { $exists: true }
    }
    
    if (relatedJob) filter.relatedJob = relatedJob
    if (relatedTool) filter.relatedTool = relatedTool
    
    const reviews = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('userName title description rating category createdAt upvotes downvotes relatedJob relatedTool')
    
    return NextResponse.json({ reviews })
    
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}