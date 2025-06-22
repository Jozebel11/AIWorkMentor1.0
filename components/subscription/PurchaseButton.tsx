'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Crown } from 'lucide-react'
import { useRevenueCat } from './RevenueCatProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PurchaseButtonProps {
  packageId?: string
  className?: string
  children?: React.ReactNode
}

export function PurchaseButton({ packageId = 'premium_monthly', className, children }: PurchaseButtonProps) {
  const { offerings, purchasePackage, isLoading, error } = useRevenueCat()
  const [purchasing, setPurchasing] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    if (!offerings || offerings.length === 0) {
      toast.error('No subscription plans available')
      return
    }

    const currentOffering = offerings[0]
    const packageToPurchase = currentOffering.availablePackages.find(
      pkg => pkg.identifier === packageId
    )

    if (!packageToPurchase) {
      toast.error('Subscription plan not found')
      return
    }

    setPurchasing(true)

    try {
      const customerInfo = await purchasePackage(packageToPurchase)
      
      if (customerInfo) {
        // Check if purchase was successful
        const hasPremium = customerInfo.entitlements?.premium?.isActive
        
        if (hasPremium) {
          toast.success('Welcome to Premium! 🎉')
          router.refresh() // Refresh to update UI with new subscription status
          router.push('/') // Redirect to home page
        } else {
          toast.error('Purchase completed but premium access not activated. Please contact support.')
        }
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      toast.error('Purchase failed. Please try again.')
    } finally {
      setPurchasing(false)
    }
  }

  if (isLoading) {
    return (
      <Button disabled className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (error) {
    return (
      <Button disabled variant="destructive" className={className}>
        Payment System Unavailable
      </Button>
    )
  }

  if (!offerings || offerings.length === 0) {
    return (
      <Button disabled className={className}>
        No Plans Available
      </Button>
    )
  }

  const currentOffering = offerings[0]
  const packageToPurchase = currentOffering.availablePackages.find(
    pkg => pkg.identifier === packageId
  )

  if (!packageToPurchase) {
    return (
      <Button disabled className={className}>
        Plan Not Found
      </Button>
    )
  }

  return (
    <Button 
      onClick={handlePurchase} 
      disabled={purchasing}
      className={className}
    >
      {purchasing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {children || (
            <>
              <Crown className="mr-2 h-4 w-4" />
              Subscribe for {packageToPurchase.product.priceString}
            </>
          )}
        </>
      )}
    </Button>
  )
}