'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Review {
  _id: string
  userName: string
  title: string
  description: string
  rating: number
  category: string
  createdAt: string
  upvotes: number
  downvotes: number
  relatedJob?: string
  relatedTool?: string
}

interface ReviewDisplayProps {
  relatedJob?: string
  relatedTool?: string
  limit?: number
}

export function ReviewDisplay({ relatedJob, relatedTool, limit = 10 }: ReviewDisplayProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [relatedJob, relatedTool])

  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams()
      if (relatedJob) params.append('relatedJob', relatedJob)
      if (relatedTool) params.append('relatedTool', relatedTool)
      params.append('limit', limit.toString())

      const response = await fetch(`/api/feedback/reviews?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      const data = await response.json()
      setReviews(data.reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (reviewId: string, type: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/feedback/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type })
      })

      if (response.ok) {
        // Refresh reviews to get updated vote counts
        fetchReviews()
      }
    } catch (error) {
      console.error('Error voting on review:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">User Reviews ({reviews.length})</h3>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>by {review.userName}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="outline">{review.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{review.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review._id, 'up')}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.upvotes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review._id, 'down')}
                    className="flex items-center gap-1"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{review.downvotes}</span>
                  </Button>
                </div>
                
                {(review.relatedJob || review.relatedTool) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {review.relatedJob && <Badge variant="secondary">Job: {review.relatedJob}</Badge>}
                    {review.relatedTool && <Badge variant="secondary">Tool: {review.relatedTool}</Badge>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}