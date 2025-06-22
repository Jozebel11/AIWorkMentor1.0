'use client'

import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubscriptionPlans } from '@/components/subscription/SubscriptionPlans'
import { RevenueCatProvider } from '@/components/subscription/RevenueCatProvider'
import { useEffect } from 'react'

export default function UpgradePage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/subscription/upgrade')
    }
  }, [session, router])

  if (!session) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center">
          <p>Please sign in to access subscription options.</p>
        </div>
      </div>
    )
  }

  return (
    <RevenueCatProvider>
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-4 w-4 mr-1" />
              Premium Plan
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Unlock Your AI Potential
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Get unlimited access to premium AI productivity content and accelerate your career growth
            </p>
          </div>

          <SubscriptionPlans />
        </div>
      </div>
    </RevenueCatProvider>
  )
}