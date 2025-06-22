import { SignUpForm } from '@/components/auth/SignUpForm'

export const metadata = {
  title: 'Sign Up - AIWorkMentor',
  description: 'Create your AIWorkMentor account to access premium AI productivity content and tools.',
}

export default function SignUpPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
      <SignUpForm />
    </div>
  )
}