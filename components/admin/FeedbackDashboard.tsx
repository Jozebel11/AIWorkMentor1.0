'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Star, MessageSquare, Bug, Lightbulb, FileText, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

interface FeedbackItem {
  _id: string
  userName: string
  userEmail: string
  type: string
  category: string
  title: string
  description: string
  rating?: number
  priority: string
  status: string
  createdAt: string
  adminResponse?: string
  adminNotes?: string
  respondedAt?: string
  relatedJob?: string
  relatedTool?: string
  relatedPage?: string
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
}

const typeIcons = {
  review: Star,
  issue: Bug,
  content_request: FileText,
  feature_request: Lightbulb,
  bug_report: AlertTriangle
}

export function FeedbackDashboard() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)
  const [responseText, setResponseText] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback/admin')
      if (response.ok) {
        const data = await response.json()
        setFeedback(data.feedback)
      }
    } catch (error) {
      console.error('Error fetching feedback:', error)
      toast.error('Failed to load feedback')
    } finally {
      setLoading(false)
    }
  }

  const handleRespond = async () => {
    if (!selectedFeedback || !responseText.trim()) return

    try {
      const response = await fetch(`/api/feedback/admin/${selectedFeedback._id}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackId: selectedFeedback._id,
          response: responseText,
          status: newStatus || selectedFeedback.status,
          adminNotes: adminNotes
        })
      })

      if (response.ok) {
        toast.success('Response sent successfully')
        setSelectedFeedback(null)
        setResponseText('')
        setNewStatus('')
        setAdminNotes('')
        fetchFeedback() // Refresh the list
      } else {
        throw new Error('Failed to send response')
      }
    } catch (error) {
      console.error('Error sending response:', error)
      toast.error('Failed to send response')
    }
  }

  const filteredFeedback = feedback.filter(item => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending') return item.status === 'pending'
    if (activeTab === 'reviews') return item.type === 'review'
    if (activeTab === 'issues') return ['issue', 'bug_report'].includes(item.type)
    return true
  })

  const stats = {
    total: feedback.length,
    pending: feedback.filter(f => f.status === 'pending').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
    avgRating: feedback.filter(f => f.rating).reduce((acc, f) => acc + (f.rating || 0), 0) / feedback.filter(f => f.rating).length || 0
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Feedback</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Management</CardTitle>
          <CardDescription>
            Manage user feedback, reviews, and support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({feedback.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredFeedback.map((item) => {
                  const TypeIcon = typeIcons[item.type as keyof typeof typeIcons] || MessageSquare
                  
                  return (
                    <Card key={item._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <TypeIcon className="h-4 w-4" />
                              <h3 className="font-medium">{item.title}</h3>
                              <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                                {item.status.replace('_', ' ')}
                              </Badge>
                              <Badge className={priorityColors[item.priority as keyof typeof priorityColors]}>
                                {item.priority}
                              </Badge>
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{item.rating}</span>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description.length > 150 
                                ? `${item.description.substring(0, 150)}...` 
                                : item.description
                              }
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>From: {item.userName} ({item.userEmail})</span>
                              <span>•</span>
                              <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                              {item.relatedJob && (
                                <>
                                  <span>•</span>
                                  <span>Job: {item.relatedJob}</span>
                                </>
                              )}
                              {item.relatedTool && (
                                <>
                                  <span>•</span>
                                  <span>Tool: {item.relatedTool}</span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {item.adminResponse && (
                              <Badge variant="outline\" className="text-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Responded
                              </Badge>
                            )}
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFeedback(item)
                                    setNewStatus(item.status)
                                    setAdminNotes(item.adminNotes || '')
                                  }}
                                >
                                  {item.adminResponse ? 'Update' : 'Respond'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Respond to Feedback</DialogTitle>
                                  <DialogDescription>
                                    Send a response to {item.userName} about their {item.type.replace('_', ' ')}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-4">
                                  <div className="bg-muted p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                  
                                  {item.adminResponse && (
                                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                                      <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">
                                        Previous Response:
                                      </h4>
                                      <p className="text-sm">{item.adminResponse}</p>
                                    </div>
                                  )}
                                  
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <Select value={newStatus} onValueChange={setNewStatus}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="in_review">In Review</SelectItem>
                                          <SelectItem value="in_progress">In Progress</SelectItem>
                                          <SelectItem value="resolved">Resolved</SelectItem>
                                          <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium">Response to User</label>
                                    <Textarea
                                      placeholder="Write your response to the user..."
                                      value={responseText}
                                      onChange={(e) => setResponseText(e.target.value)}
                                      rows={4}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium">Admin Notes (Internal)</label>
                                    <Textarea
                                      placeholder="Internal notes for team reference..."
                                      value={adminNotes}
                                      onChange={(e) => setAdminNotes(e.target.value)}
                                      rows={2}
                                    />
                                  </div>
                                  
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleRespond} disabled={!responseText.trim()}>
                                      Send Response
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}