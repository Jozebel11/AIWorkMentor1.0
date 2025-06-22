import { SignInForm } from '@/components/auth/SignInForm'
import { Suspense } from 'react'

export const metadata = {
  title: 'Sign In - ThriveWithAI',
  description: 'Sign in to your ThriveWithAI account to access premium AI productivity content.',
}

export default function SignInPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  )
}