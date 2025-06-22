import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import AzureADProvider from "next-auth/providers/azure-ad"
import { connectToDatabase } from "@/lib/database/connection"
import { User } from "@/lib/database/models/User"
import { RevenueCatService } from "@/lib/subscription/revenuecat"
import bcrypt from "bcryptjs"
import { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Apple ID
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),

    // Microsoft/Outlook (Azure AD)
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),

    // Email/Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        try {
          await connectToDatabase()
          
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password')

          if (!user) {
            throw new Error("Invalid credentials")
          }

          // Check if user signed up with OAuth (no password)
          if (!user.password) {
            throw new Error("Please sign in with your social account")
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid credentials")
          }

          // Update last login
          await User.findByIdAndUpdate(user._id, {
            lastLoginAt: new Date()
          })

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionTier: user.subscriptionTier,
            revenueCatUserId: user.revenueCatUserId
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw new Error("Authentication failed")
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase()

        // Handle OAuth sign-ins
        if (account?.provider !== 'credentials') {
          const existingUser = await User.findOne({ 
            email: user.email?.toLowerCase() 
          })

          if (existingUser) {
            // Update existing user with OAuth info
            await User.findByIdAndUpdate(existingUser._id, {
              lastLoginAt: new Date(),
              image: user.image || existingUser.image,
              // Link OAuth account if not already linked
              [`oauth.${account.provider}`]: {
                id: account.providerAccountId,
                email: user.email
              }
            })
          } else {
            // Create new user from OAuth
            const newUser = new User({
              email: user.email?.toLowerCase(),
              name: user.name || 'User',
              image: user.image,
              emailVerified: true, // OAuth emails are pre-verified
              subscriptionStatus: 'free',
              subscriptionTier: 'free',
              oauth: {
                [account.provider]: {
                  id: account.providerAccountId,
                  email: user.email
                }
              }
            })

            await newUser.save()

            // Create RevenueCat customer
            try {
              await RevenueCatService.createCustomer(
                newUser._id.toString(),
                newUser.email
              )
              
              newUser.revenueCatUserId = newUser._id.toString()
              await newUser.save()
            } catch (error) {
              console.error('Failed to create RevenueCat customer:', error)
            }
          }
        }

        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.subscriptionStatus = user.subscriptionStatus
        token.subscriptionTier = user.subscriptionTier
        token.revenueCatUserId = user.revenueCatUserId
      }

      // Refresh user data from database periodically
      if (token.sub && Date.now() - (token.iat || 0) * 1000 > 24 * 60 * 60 * 1000) {
        try {
          await connectToDatabase()
          const dbUser = await User.findById(token.sub)
          if (dbUser) {
            token.subscriptionStatus = dbUser.subscriptionStatus
            token.subscriptionTier = dbUser.subscriptionTier
            token.revenueCatUserId = dbUser.revenueCatUserId
            token.name = dbUser.name
            token.email = dbUser.email
            token.picture = dbUser.image
          }
        } catch (error) {
          console.error('Error refreshing user data:', error)
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.subscriptionStatus = token.subscriptionStatus as string
        session.user.subscriptionTier = token.subscriptionTier as string
        session.user.revenueCatUserId = token.revenueCatUserId as string
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error"
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Log successful sign-ins for security monitoring
      console.log(`User signed in: ${user.email} via ${account?.provider}`)
    },
    async signOut({ token }) {
      // Log sign-outs for security monitoring
      console.log(`User signed out: ${token?.email}`)
    }
  }
}