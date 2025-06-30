'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import * as Purchases from '@revenuecat/purchases-js'
import type { 
  PurchasesOffering, 
  PurchasesPackage, 
  CustomerInfo,
  PurchasesError,
  LOG_LEVEL
} from '@revenuecat/purchases-js'

interface RevenueCatContextType {
  offerings: PurchasesOffering[] | null
  customerInfo: CustomerInfo | null
  isLoading: boolean
  purchasePackage: (packageToPurchase: PurchasesPackage) => Promise<CustomerInfo | null>
  restorePurchases: () => Promise<CustomerInfo | null>
  error: string | null
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined)

interface RevenueCatProviderProps {
  children: ReactNode
}

export function RevenueCatProvider({ children }: RevenueCatProviderProps) {
  const { data: session } = useSession()
  const [offerings, setOfferings] = useState<PurchasesOffering[] | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeRevenueCat = async () => {
      if (!session?.user?.id) {
        setIsLoading(false)
        return
      }

      try {
        const publicKey = process.env.NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY
        
        if (!publicKey) {
          throw new Error('RevenueCat public key not configured')
        }

        // Configure RevenueCat
        await Purchases.configure({
          apiKey: publicKey,
          appUserId: session.user.id
        })

        // Set log level for debugging (remove in production)
        Purchases.setLogLevel(LOG_LEVEL.DEBUG)

        // Get current customer info
        const customerInfo = await Purchases.getCustomerInfo()
        setCustomerInfo(customerInfo)

        // Get available offerings
        const offerings = await Purchases.getOfferings()
        if (offerings.current) {
          setOfferings([offerings.current])
        } else {
          setOfferings([])
        }

        setError(null)
      } catch (err) {
        console.error('RevenueCat initialization error:', err)
        setError('Failed to initialize payment system')
        
        // Fallback to mock data for development
        if (process.env.NODE_ENV === 'development') {
          console.warn('Using mock RevenueCat data for development')
          setOfferings([{
            identifier: 'default',
            serverDescription: 'Default offering',
            availablePackages: [
              {
                identifier: 'premium_monthly',
                packageType: 'MONTHLY',
                product: {
                  identifier: 'premium_monthly',
                  description: 'Premium Monthly Subscription',
                  title: 'Premium Monthly',
                  price: 19.99,
                  priceString: '$19.99',
                  currencyCode: 'USD',
                  introPrice: null,
                  discounts: []
                },
                offeringIdentifier: 'default'
              } as PurchasesPackage,
              {
                identifier: 'premium_yearly',
                packageType: 'ANNUAL',
                product: {
                  identifier: 'premium_yearly',
                  description: 'Premium Yearly Subscription',
                  title: 'Premium Yearly',
                  price: 199.99,
                  priceString: '$199.99',
                  currencyCode: 'USD',
                  introPrice: null,
                  discounts: []
                },
                offeringIdentifier: 'default'
              } as PurchasesPackage
            ]
          } as PurchasesOffering])
          
          setCustomerInfo({
            originalAppUserId: session.user.id,
            allPurchaseDates: {},
            allExpirationDates: {},
            entitlements: {
              active: {},
              all: {}
            },
            activeSubscriptions: [],
            allPurchasedProductIdentifiers: [],
            nonSubscriptionTransactions: [],
            firstSeen: new Date().toISOString(),
            originalApplicationVersion: '1.0.0',
            requestDate: new Date().toISOString(),
            latestExpirationDate: null,
            originalPurchaseDate: null,
            managementURL: null
          } as CustomerInfo)
        }
      } finally {
        setIsLoading(false)
      }
    }

    initializeRevenueCat()
  }, [session?.user?.id])

  const purchasePackage = async (packageToPurchase: PurchasesPackage): Promise<CustomerInfo | null> => {
    try {
      setIsLoading(true)
      setError(null)

      // Check if we're in development mode with mock data
      if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY) {
        console.warn('Mock purchase in development mode')
        
        // Simulate purchase delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const mockCustomerInfo: CustomerInfo = {
          originalAppUserId: session?.user?.id || 'mock-user',
          allPurchaseDates: {
            [packageToPurchase.identifier]: new Date().toISOString()
          },
          allExpirationDates: {
            [packageToPurchase.identifier]: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          entitlements: {
            active: {
              premium: {
                identifier: 'premium',
                isActive: true,
                willRenew: true,
                latestPurchaseDate: new Date().toISOString(),
                originalPurchaseDate: new Date().toISOString(),
                expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                store: 'WEB',
                productIdentifier: packageToPurchase.identifier,
                isSandbox: true,
                unsubscribeDetectedAt: null,
                billingIssueDetectedAt: null
              }
            },
            all: {
              premium: {
                identifier: 'premium',
                isActive: true,
                willRenew: true,
                latestPurchaseDate: new Date().toISOString(),
                originalPurchaseDate: new Date().toISOString(),
                expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                store: 'WEB',
                productIdentifier: packageToPurchase.identifier,
                isSandbox: true,
                unsubscribeDetectedAt: null,
                billingIssueDetectedAt: null
              }
            }
          },
          activeSubscriptions: [packageToPurchase.identifier],
          allPurchasedProductIdentifiers: [packageToPurchase.identifier],
          nonSubscriptionTransactions: [],
          firstSeen: new Date().toISOString(),
          originalApplicationVersion: '1.0.0',
          requestDate: new Date().toISOString(),
          latestExpirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          originalPurchaseDate: new Date().toISOString(),
          managementURL: null
        }
        
        setCustomerInfo(mockCustomerInfo)
        await updateUserSubscription(mockCustomerInfo)
        return mockCustomerInfo
      }

      // Real RevenueCat purchase
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase)
      
      setCustomerInfo(customerInfo)

      // Update user subscription status in our database
      await updateUserSubscription(customerInfo)

      return customerInfo
    } catch (err: any) {
      console.error('Purchase error:', err)
      
      if (err.userCancelled) {
        setError('Purchase was cancelled')
      } else if (err.code === 'PURCHASE_NOT_ALLOWED_ERROR') {
        setError('Purchases are not allowed on this device')
      } else if (err.code === 'PAYMENT_PENDING_ERROR') {
        setError('Payment is pending. Please wait for confirmation.')
      } else {
        setError('Purchase failed. Please try again.')
      }
      
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const restorePurchases = async (): Promise<CustomerInfo | null> => {
    try {
      setIsLoading(true)
      setError(null)

      // Check if we're in development mode with mock data
      if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY) {
        console.warn('Mock restore in development mode')
        
        const mockCustomerInfo: CustomerInfo = {
          originalAppUserId: session?.user?.id || 'mock-user',
          allPurchaseDates: {},
          allExpirationDates: {},
          entitlements: {
            active: {},
            all: {}
          },
          activeSubscriptions: [],
          allPurchasedProductIdentifiers: [],
          nonSubscriptionTransactions: [],
          firstSeen: new Date().toISOString(),
          originalApplicationVersion: '1.0.0',
          requestDate: new Date().toISOString(),
          latestExpirationDate: null,
          originalPurchaseDate: null,
          managementURL: null
        }
        
        setCustomerInfo(mockCustomerInfo)
        await updateUserSubscription(mockCustomerInfo)
        return mockCustomerInfo
      }

      // Real RevenueCat restore
      const customerInfo = await Purchases.restorePurchases()
      
      setCustomerInfo(customerInfo)

      // Update user subscription status in our database
      await updateUserSubscription(customerInfo)

      return customerInfo
    } catch (err) {
      console.error('Restore purchases error:', err)
      setError('Failed to restore purchases')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserSubscription = async (customerInfo: CustomerInfo) => {
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