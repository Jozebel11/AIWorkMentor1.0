import { NextRequest, NextResponse } from 'next/server'
import { RevenueCatService } from '@/lib/subscription/revenuecat'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook signature
    const signature = request.headers.get('x-revenuecat-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }
    
    // Verify the signature (uncomment in production)
    const isValid = verifySignature(
      JSON.stringify(body),
      signature,
      process.env.REVENUECAT_WEBHOOK_SECRET || ''
    )
    
    if (!isValid && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
    
    // Process webhook event
    const { event } = body
    
    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'PRODUCT_CHANGE':
      case 'UNCANCELLATION':
        await RevenueCatService.updateSubscriptionStatus(
          event.app_user_id,
          {
            entitlements: {
              premium: { is_active: true }
            }
          }
        )
        break
        
      case 'CANCELLATION':
      case 'EXPIRATION':
      case 'BILLING_ISSUE':
        await RevenueCatService.updateSubscriptionStatus(
          event.app_user_id,
          {
            entitlements: {
              premium: { is_active: false }
            }
          }
        )
        break
        
      case 'NON_RENEWING_PURCHASE':
        // Handle one-time purchases if needed
        break
        
      case 'SUBSCRIPTION_PAUSED':
        // Handle subscription pauses if needed
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

// Helper function to verify webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) return true // Skip verification if no secret is set (for development)
  
  try {
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(payload).digest('hex')
    return crypto.timingSafeEqual(
      Buffer.from(digest, 'hex'),
      Buffer.from(signature, 'hex')
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}