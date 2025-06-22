import { NextRequest, NextResponse } from 'next/server'
import { RevenueCatService } from '@/lib/subscription/revenuecat'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook signature (implement based on RevenueCat docs)
    const signature = request.headers.get('x-revenuecat-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }
    
    // Process webhook event
    const { event } = body
    
    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'PRODUCT_CHANGE':
        await RevenueCatService.updateSubscriptionStatus(
          event.app_user_id,
          event.subscriber
        )
        break
        
      case 'CANCELLATION':
      case 'EXPIRATION':
        await RevenueCatService.updateSubscriptionStatus(
          event.app_user_id,
          { entitlements: { premium: { is_active: false } } }
        )
        break
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}