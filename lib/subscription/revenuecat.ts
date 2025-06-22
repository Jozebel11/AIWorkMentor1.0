// RevenueCat server-side integration
export class RevenueCatService {
  private static readonly API_BASE = 'https://api.revenuecat.com/v1'
  private static readonly API_KEY = process.env.REVENUECAT_SECRET_KEY

  static async createCustomer(userId: string, email: string) {
    try {
      const response = await fetch(`${this.API_BASE}/subscribers/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_user_id: userId,
          email: email
        })
      })

      if (!response.ok) {
        throw new Error(`RevenueCat API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating RevenueCat customer:', error)
      throw error
    }
  }

  static async getCustomerInfo(userId: string) {
    try {
      const response = await fetch(`${this.API_BASE}/subscribers/${userId}`, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null // Customer doesn't exist
        }
        throw new Error(`RevenueCat API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching RevenueCat customer:', error)
      throw error
    }
  }

  static async updateSubscriptionStatus(userId: string, subscriptionData: any) {
    // This would be called from webhook handlers
    try {
      const { User } = await import('@/lib/database/models/User')
      await import('@/lib/database/connection').then(m => m.connectToDatabase())

      const isActive = subscriptionData.entitlements?.premium?.is_active || false
      const subscriptionStatus = isActive ? 'active' : 'expired'
      const subscriptionTier = isActive ? 'premium' : 'free'

      await User.findOneAndUpdate(
        { revenueCatUserId: userId },
        {
          subscriptionStatus,
          subscriptionTier,
          updatedAt: new Date()
        }
      )

      return { success: true }
    } catch (error) {
      console.error('Error updating subscription status:', error)
      throw error
    }
  }
}