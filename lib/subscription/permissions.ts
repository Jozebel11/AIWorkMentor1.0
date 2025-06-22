export type SubscriptionTier = 'free' | 'premium'
export type SubscriptionStatus = 'free' | 'active' | 'expired' | 'cancelled'

export interface UserSubscription {
  tier: SubscriptionTier
  status: SubscriptionStatus
}

export class SubscriptionPermissions {
  static canAccessPremiumContent(subscription: UserSubscription): boolean {
    return subscription.tier === 'premium' && subscription.status === 'active'
  }

  static canAccessPromptExamples(subscription: UserSubscription, index: number): boolean {
    // Free users can only see the first prompt example
    if (subscription.tier === 'free') {
      return index === 0
    }
    return this.canAccessPremiumContent(subscription)
  }

  static canAccessJobGuides(subscription: UserSubscription, index: number): boolean {
    // Free users can only access the first guide
    if (subscription.tier === 'free') {
      return index === 0
    }
    return this.canAccessPremiumContent(subscription)
  }

  static canAccessFullUseCases(subscription: UserSubscription): boolean {
    return this.canAccessPremiumContent(subscription)
  }

  static getMaxPromptExamples(subscription: UserSubscription): number {
    return subscription.tier === 'free' ? 1 : -1 // -1 means unlimited
  }

  static getMaxJobGuides(subscription: UserSubscription): number {
    return subscription.tier === 'free' ? 1 : -1 // -1 means unlimited
  }
}