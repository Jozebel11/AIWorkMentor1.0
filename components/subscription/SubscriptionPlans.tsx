'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Crown, Zap, Star } from 'lucide-react'
import { useRevenueCat } from './RevenueCatProvider'
import { PurchaseButton } from './PurchaseButton'
import { useSession } from 'next-auth/react'

export function SubscriptionPlans() {
  const { offerings, customerInfo, isLoading, restorePurchases } = useRevenueCat()
  const { data: session } = useSession()

  const isPremium = customerInfo?.entitlements?.premium?.isActive || false

  const features = [
    'Access to all prompt examples and templates',
    'Unlimited job-specific AI guides',
    'Premium resources and case studies',
    'Advanced AI workflow tutorials',
    'Priority customer support',
    'Early access to new features'
  ]

  if (isLoading) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded w-1/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const currentOffering = offerings?.[0]
  const monthlyPackage = currentOffering?.availablePackages.find(
    pkg => pkg.identifier === 'premium_monthly'
  )
  const yearlyPackage = currentOffering?.availablePackages.find(
    pkg => pkg.identifier === 'premium_yearly'
  )

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Access to 1 prompt example per job</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">1 AI guide per profession</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Basic AI tools directory</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Community support</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-6" disabled>
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-primary shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              Premium Plan
            </CardTitle>
            <CardDescription>Everything you need to thrive with AI</CardDescription>
            <div className="text-3xl font-bold">
              {monthlyPackage?.product.priceString || '$19'}
              <span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            {yearlyPackage && (
              <div className="text-sm text-muted-foreground">
                Or {yearlyPackage.product.priceString}/year (save 20%)
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            {isPremium ? (
              <Button className="w-full mt-6" disabled>
                <Crown className="mr-2 h-4 w-4" />
                Current Plan
              </Button>
            ) : (
              <div className="space-y-3 mt-6">
                <PurchaseButton 
                  packageId="premium_monthly"
                  className="w-full"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Subscribe Monthly
                </PurchaseButton>
                
                {yearlyPackage && (
                  <PurchaseButton 
                    packageId="premium_yearly"
                    className="w-full"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Subscribe Yearly (Save 20%)
                  </PurchaseButton>
                )}
              </div>
            )}
            
            <p className="text-xs text-center text-muted-foreground mt-2">
              Cancel anytime. No long-term commitments.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Restore Purchases Button */}
      {session && !isPremium && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={restorePurchases}
            className="text-sm"
          >
            Already subscribed? Restore purchases
          </Button>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and other payment methods through our secure payment processor.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is there a free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes! New users get a 7-day free trial of our Premium plan. No credit card required to start.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}