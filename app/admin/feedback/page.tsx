import { FeedbackDashboard } from '@/components/admin/FeedbackDashboard'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Feedback Dashboard - Admin',
  description: 'Manage user feedback, reviews, and support requests.',
}

// Helper function to check if user is admin
function isAdmin(user: any): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(user.email)
}

export default async function AdminFeedbackPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || !isAdmin(session.user)) {
    redirect('/auth/signin')
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Feedback Dashboard</h1>
        <p className="text-muted-foreground">
          Manage user feedback, reviews, and support requests from the ThriveWithAI community.
        </p>
      </div>
      
      <FeedbackDashboard />
    </div>
  )
}