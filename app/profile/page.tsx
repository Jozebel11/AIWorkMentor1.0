'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Settings, 
  Activity,
  BookOpen,
  Star,
  TrendingUp,
  Clock,
  Award,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(session?.user?.name || '')
  const [isLoading, setIsLoading] = useState(false)

  if (status === 'loading') {
    return (
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (response.ok) {
        toast.success('Profile updated successfully')
        setIsEditing(false)
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const getUserInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const isPremium = session.user.subscriptionTier === 'premium' && 
                   session.user.subscriptionStatus === 'active'

  // Mock data for demonstration
  const userStats = {
    guidesCompleted: 12,
    toolsExplored: 8,
    promptsUsed: 45,
    timesSaved: '24 hours',
    joinDate: new Date(2024, 0, 15),
    lastActive: new Date(),
    favoriteTools: ['ChatGPT', 'Midjourney', 'GitHub Copilot'],
    recentActivity: [
      { action: 'Completed', item: 'AI-Powered Lesson Planning', type: 'guide', date: '2 hours ago' },
      { action: 'Explored', item: 'Claude', type: 'tool', date: '1 day ago' },
      { action: 'Used', item: 'Code Review Prompt', type: 'prompt', date: '2 days ago' },
      { action: 'Completed', item: 'Content Strategy with AI', type: 'guide', date: '3 days ago' },
    ]
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and track your AI learning progress
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={session.user.image || undefined} />
                      <AvatarFallback className="text-lg">
                        {getUserInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold">{session.user.name}</h2>
                        {isPremium && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{session.user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Member since {userStats.joinDate.toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.guidesCompleted}</div>
                      <p className="text-xs text-muted-foreground">Guides Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.toolsExplored}</div>
                      <p className="text-xs text-muted-foreground">Tools Explored</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.promptsUsed}</div>
                      <p className="text-xs text-muted-foreground">Prompts Used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">{userStats.timesSaved}</div>
                      <p className="text-xs text-muted-foreground">Time Saved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Favorite Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite AI Tools</CardTitle>
                <CardDescription>
                  Tools you use most frequently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userStats.favoriteTools.map((tool, index) => (
                    <Badge key={index} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Continue your AI learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" asChild className="h-auto p-4 flex-col">
                    <Link href="/jobs">
                      <BookOpen className="h-6 w-6 mb-2" />
                      <span className="font-medium">Explore Guides</span>
                      <span className="text-xs text-muted-foreground">Find AI guides for your profession</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4 flex-col">
                    <Link href="/tools">
                      <Zap className="h-6 w-6 mb-2" />
                      <span className="font-medium">Discover Tools</span>
                      <span className="text-xs text-muted-foreground">Browse AI tools directory</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4 flex-col">
                    <Link href="/resources">
                      <Star className="h-6 w-6 mb-2" />
                      <span className="font-medium">View Resources</span>
                      <span className="text-xs text-muted-foreground">Access learning materials</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent interactions with AIWorkMentor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="rounded-full bg-primary/10 p-2">
                        {activity.type === 'guide' && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === 'tool' && <Zap className="h-4 w-4 text-primary" />}
                        {activity.type === 'prompt' && <Target className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.action} <span className="text-primary">{activity.item}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>
                  Track your AI mastery journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Fundamentals</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Prompt Engineering</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tool Mastery</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Milestones you've reached in your AI journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-blue-600 p-2">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">First Steps</h3>
                        <p className="text-xs text-muted-foreground">Completed your first guide</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Earned</Badge>
                  </div>

                  <div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-green-600 p-2">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Tool Explorer</h3>
                        <p className="text-xs text-muted-foreground">Explored 5 different AI tools</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Earned</Badge>
                  </div>

                  <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-purple-600 p-2">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Prompt Master</h3>
                        <p className="text-xs text-muted-foreground">Used 25 prompt templates</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Earned</Badge>
                  </div>

                  <div className="p-4 rounded-lg border opacity-60">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-muted p-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-muted-foreground">AI Expert</h3>
                        <p className="text-xs text-muted-foreground">Complete 50 guides</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">12/50</Badge>
                  </div>

                  <div className="p-4 rounded-lg border opacity-60">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="rounded-full bg-muted p-2">
                        <Crown className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-muted-foreground">Premium Member</h3>
                        <p className="text-xs text-muted-foreground">Subscribe to Premium</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Locked</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{session.user.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{session.user.email}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateProfile} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false)
                        setName(session.user.name || '')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>
                  Manage your AIWorkMentor subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isPremium ? (
                      <>
                        <Crown className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">Premium Member</p>
                          <p className="text-sm text-muted-foreground">
                            Access to all premium content and features
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Free Member</p>
                          <p className="text-sm text-muted-foreground">
                            Limited access to content
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  {!isPremium && (
                    <Button asChild>
                      <Link href="/subscription/upgrade">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Premium
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Account Settings</p>
                    <p className="text-sm text-muted-foreground">
                      Update preferences, notifications, and privacy settings
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Download Data</p>
                    <p className="text-sm text-muted-foreground">
                      Export your account data and activity history
                    </p>
                  </div>
                  <Button variant="outline" disabled>
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}