'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

// Mock RevenueCat types for now since the package has import issues
interface MockCustomerInfo {
  entitlements?: {
    premium?: {
      isActive: boolean
    }
  }
  activeSubscriptions?: string[]
  originalAppUserId?: string
}

interface MockPurchasesPackage {
  identifier: string
  product: {
    priceString: string
  }
}

interface MockPurchasesOffering {
  availablePackages: MockPurchasesPackage[]
}

interface RevenueCatContextType {
  offerings: MockPurchasesOffering[] | null
  customerInfo: MockCustomerInfo | null
  isLoading: boolean
  purchasePackage: (packageToPurchase: MockPurchasesPackage) => Promise<MockCustomerInfo | null>
  restorePurchases: () => Promise<MockCustomerInfo | null>
  error: string | null
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined)

interface RevenueCatProviderProps {
  children: ReactNode
}

export function RevenueCatProvider({ children }: RevenueCatProviderProps) {
  const { data: session } = useSession()
  const [offerings, setOfferings] = useState<MockPurchasesOffering[] | null>(null)
  const [customerInfo, setCustomerInfo] = useState<MockCustomerInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeRevenueCat = async () => {
      if (!session?.user?.id) {
        setIsLoading(false)
        return
      }

      try {
        // Mock implementation for now
        const mockOffering: MockPurchasesOffering = {
          availablePackages: [
            {
              identifier: 'premium_monthly',
              product: {
                priceString: '$19.99'
              }
            },
            {
              identifier: 'premium_yearly',
              product: {
                priceString: '$199.99'
              }
            }
          ]
        }

        setOfferings([mockOffering])
        setCustomerInfo({
          entitlements: {
            premium: {
              isActive: false
            }
          }
        })

        setError(null)
      } catch (err) {
        console.error('RevenueCat initialization error:', err)
        setError('Failed to initialize payment system')
      } finally {
        setIsLoading(false)
      }
    }

    initializeRevenueCat()
  }, [session?.user?.id])

  const purchasePackage = async (packageToPurchase: MockPurchasesPackage): Promise<MockCustomerInfo | null> => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock purchase implementation
      console.log('Mock purchase for package:', packageToPurchase.identifier)
      
      const mockCustomerInfo: MockCustomerInfo = {
        entitlements: {
          premium: {
            isActive: true
          }
        }
      }
      
      setCustomerInfo(mockCustomerInfo)

      // Update user subscription status in our database
      await updateUserSubscription(mockCustomerInfo)

      return mockCustomerInfo
    } catch (err: any) {
      console.error('Purchase error:', err)
      
      if (err.userCancelled) {
        setError('Purchase was cancelled')
      } else {
        setError('Purchase failed. Please try again.')
      }
      
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const restorePurchases = async (): Promise<MockCustomerInfo | null> => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock restore implementation
      const mockCustomerInfo: MockCustomerInfo = {
        entitlements: {
          premium: {
            isActive: false
          }
        }
      }
      
      setCustomerInfo(mockCustomerInfo)

      // Update user subscription status in our database
      await updateUserSubscription(mockCustomerInfo)

      return mockCustomerInfo
    } catch (err) {
      console.error('Restore purchases error:', err)
      setError('Failed to restore purchases')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserSubscription = async (customerInfo: MockCustomerInfo) => {
    try {
      const response = await fetch('/api/subscription/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: {
            entitlements: customerInfo.entitlements,
            activeSubscriptions: customerInfo.activeSubscriptions,
            originalAppUserId: customerInfo.originalAppUserId
          }
        })
      })

      if (!response.ok) {
        console.error('Failed to update subscription status')
      }
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  const value: RevenueCatContextType = {
    offerings,
    customerInfo,
    isLoading,
    purchasePackage,
    restorePurchases,
    error
  }

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  )
}

export function useRevenueCat() {
  const context = useContext(RevenueCatContext)
  if (context === undefined) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider')
  }
  return context
}