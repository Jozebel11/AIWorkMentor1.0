'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Crown, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionGateProps {
  children: ReactNode
  requiresPremium?: boolean
  fallback?: ReactNode
  blurContent?: boolean
  showUpgradePrompt?: boolean
}

export function SubscriptionGate({
  children,
  requiresPremium = false,
  fallback,
  blurContent = false,
  showUpgradePrompt = true
}: SubscriptionGateProps) {
  const { data: session, status } = useSession()

  // If content doesn't require premium, always show it
  if (!requiresPremium) {
    return <>{children}</>
  }

  // If user is not signed in, show sign-in prompt
  if (status === 'loading') {
    return (
      <div className="animate-pulse">
        <div className="rounded-lg border bg-muted h-48"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <Card className="relative border-dashed border-2 border-muted">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Sign In Required</CardTitle>
          <CardDescription>
            Sign in to access this premium content
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href="/auth/signin">
              Sign In to Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Check if user has premium access
  const hasPremium = session.user.subscriptionTier === 'premium' &&
    session.user.subscriptionStatus === 'active'

  // If user has premium access, show content
  if (hasPremium) {
    return <>{children}</>
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>
  }

  // If content should be blurred, show blurred version with upgrade prompt
  if (blurContent) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="max-w-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Premium Content</CardTitle>
              <CardDescription>
                Upgrade to access this exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full">
                <Link href="/subscription/upgrade">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Default upgrade prompt
  if (showUpgradePrompt) {
    return (
      <Card className="relative border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            Premium Content
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </CardTitle>
          <CardDescription>
            Unlock this content and hundreds more with a premium subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>Unlimited AI guides and prompts</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>Advanced tutorials and case studies</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              <span>Priority support and updates</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/subscription/upgrade">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/auth/signin">
                Already Premium? Sign In
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            7-day free trial • Cancel anytime
          </p>
        </CardContent>
      </Card>
    )
  }

  // If showUpgradePrompt is false, don't render anything
  return null
}