import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Rate limiting for auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    const ip = request.ip || 'unknown'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxAttempts = 5

    const current = rateLimitStore.get(ip)
    
    if (current && current.resetTime > now) {
      if (current.count >= maxAttempts) {
        return new NextResponse('Too many requests', { status: 429 })
      }
      current.count++
    } else {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    }
  }

  // Protect premium content
  if (request.nextUrl.pathname.includes('/premium/') || 
      request.nextUrl.searchParams.has('premium')) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (token.subscriptionTier !== 'premium') {
      return NextResponse.redirect(new URL('/subscription/upgrade', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/premium/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}