import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      subscriptionStatus: string
      subscriptionTier: string
      revenueCatUserId: string
    }
  }

  interface User {
    subscriptionStatus: string
    subscriptionTier: string
    revenueCatUserId: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    subscriptionStatus: string
    subscriptionTier: string
    revenueCatUserId: string
  }
}