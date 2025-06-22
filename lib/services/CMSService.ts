// Integration with HubSpot CMS and CRM
export class CMSService {
  // HubSpot Integration
  static async sendToHubSpot(feedback: any) {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn('HubSpot configuration missing')
      return null
    }

    try {
      // Create or update contact in HubSpot
      const contactResponse = await this.createOrUpdateHubSpotContact(feedback)
      
      // Create a ticket for the feedback
      const ticketResponse = await this.createHubSpotTicket(feedback, contactResponse?.id)
      
      // Create a custom object for feedback tracking
      const feedbackResponse = await this.createHubSpotFeedbackObject(feedback, contactResponse?.id)
      
      return {
        contact: contactResponse,
        ticket: ticketResponse,
        feedback: feedbackResponse
      }
    } catch (error) {
      console.error('Failed to send feedback to HubSpot:', error)
      throw error
    }
  }

  private static async createOrUpdateHubSpotContact(feedback: any) {
    try {
      // First, try to find existing contact by email
      const searchResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: 'email',
                operator: 'EQ',
                value: feedback.userEmail
              }]
            }]
          })
        }
      )

      const searchResult = await searchResponse.json()
      
      if (searchResult.results && searchResult.results.length > 0) {
        // Update existing contact
        const contactId = searchResult.results[0].id
        const updateResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
              properties: {
                firstname: feedback.userName.split(' ')[0] || feedback.userName,
                lastname: feedback.userName.split(' ').slice(1).join(' ') || '',
                email: feedback.userEmail,
                last_feedback_date: new Date().toISOString(),
                feedback_count: '1', // This would need to be incremented
                user_type: 'ThriveWithAI User'
              }
            })
          }
        )
        
        return await updateResponse.json()
      } else {
        // Create new contact
        const createResponse = await fetch(
          'https://api.hubapi.com/crm/v3/objects/contacts',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
              properties: {
                firstname: feedback.userName.split(' ')[0] || feedback.userName,
                lastname: feedback.userName.split(' ').slice(1).join(' ') || '',
                email: feedback.userEmail,
                first_feedback_date: new Date().toISOString(),
                last_feedback_date: new Date().toISOString(),
                feedback_count: '1',
                user_type: 'ThriveWithAI User',
                lifecyclestage: 'customer'
              }
            })
          }
        )
        
        return await createResponse.json()
      }
    } catch (error) {
      console.error('Error creating/updating HubSpot contact:', error)
      throw error
    }
  }

  private static async createHubSpotTicket(feedback: any, contactId?: string) {
    try {
      const ticketProperties: any = {
        subject: feedback.title,
        content: feedback.description,
        hs_pipeline: 'support_pipeline', // You'll need to create this pipeline
        hs_pipeline_stage: 'new', // Initial stage
        hs_ticket_priority: this.mapPriorityToHubSpot(feedback.priority),
        source_type: 'CHAT', // or 'EMAIL', 'FORM', etc.
        feedback_type: feedback.type,
        feedback_category: feedback.category,
        related_page: feedback.relatedPage,
        related_job: feedback.relatedJob,
        related_tool: feedback.relatedTool
      }

      if (feedback.rating) {
        ticketProperties.customer_rating = feedback.rating.toString()
      }

      const response = await fetch(
        'https://api.hubapi.com/crm/v3/objects/tickets',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            properties: ticketProperties,
            associations: contactId ? [{
              to: { id: contactId },
              types: [{
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 16 // Contact to Ticket association
              }]
            }] : undefined
          })
        }
      )

      if (!response.ok) {
        throw new Error(`HubSpot Ticket API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating HubSpot ticket:', error)
      throw error
    }
  }

  private static async createHubSpotFeedbackObject(feedback: any, contactId?: string) {
    try {
      // Create custom feedback object for better tracking
      const response = await fetch(
        'https://api.hubapi.com/crm/v3/objects/feedback', // Custom object
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            properties: {
              feedback_title: feedback.title,
              feedback_description: feedback.description,
              feedback_type: feedback.type,
              feedback_category: feedback.category,
              feedback_rating: feedback.rating?.toString() || '',
              feedback_priority: feedback.priority,
              feedback_status: feedback.status,
              user_email: feedback.userEmail,
              user_name: feedback.userName,
              related_page: feedback.relatedPage || '',
              related_job: feedback.relatedJob || '',
              related_tool: feedback.relatedTool || '',
              is_public: feedback.isPublic ? 'true' : 'false',
              submitted_date: new Date(feedback.createdAt).toISOString(),
              tags: feedback.tags?.join(', ') || ''
            },
            associations: contactId ? [{
              to: { id: contactId },
              types: [{
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 1 // Contact association
              }]
            }] : undefined
          })
        }
      )

      if (!response.ok) {
        // If custom object doesn't exist, create it as a note instead
        return await this.createHubSpotNote(feedback, contactId)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating HubSpot feedback object:', error)
      // Fallback to creating a note
      return await this.createHubSpotNote(feedback, contactId)
    }
  }

  private static async createHubSpotNote(feedback: any, contactId?: string) {
    try {
      const noteBody = `
        Feedback Type: ${feedback.type}
        Category: ${feedback.category}
        ${feedback.rating ? `Rating: ${feedback.rating}/5 stars` : ''}
        Priority: ${feedback.priority}
        
        Title: ${feedback.title}
        
        Description:
        ${feedback.description}
        
        Context:
        ${feedback.relatedPage ? `Page: ${feedback.relatedPage}` : ''}
        ${feedback.relatedJob ? `Related Job: ${feedback.relatedJob}` : ''}
        ${feedback.relatedTool ? `Related Tool: ${feedback.relatedTool}` : ''}
        
        Submitted: ${new Date(feedback.createdAt).toLocaleString()}
        Public: ${feedback.isPublic ? 'Yes' : 'No'}
        ${feedback.tags?.length ? `Tags: ${feedback.tags.join(', ')}` : ''}
      `

      const response = await fetch(
        'https://api.hubapi.com/crm/v3/objects/notes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            properties: {
              hs_note_body: noteBody,
              hs_timestamp: new Date().toISOString()
            },
            associations: contactId ? [{
              to: { id: contactId },
              types: [{
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 10 // Contact to Note association
              }]
            }] : undefined
          })
        }
      )

      return await response.json()
    } catch (error) {
      console.error('Error creating HubSpot note:', error)
      throw error
    }
  }

  private static mapPriorityToHubSpot(priority: string): string {
    const priorityMap: Record<string, string> = {
      'low': 'LOW',
      'medium': 'MEDIUM',
      'high': 'HIGH',
      'urgent': 'HIGH' // HubSpot typically has LOW, MEDIUM, HIGH
    }
    return priorityMap[priority] || 'MEDIUM'
  }

  // Method to update feedback status in HubSpot
  static async updateHubSpotFeedbackStatus(feedbackId: string, status: string, response?: string) {
    try {
      // Update the ticket status
      const ticketUpdateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/tickets/${feedbackId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            properties: {
              hs_pipeline_stage: this.mapStatusToHubSpotStage(status),
              admin_response: response || ''
            }
          })
        }
      )

      if (response) {
        // Add a note with the admin response
        await fetch(
          'https://api.hubapi.com/crm/v3/objects/notes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
              properties: {
                hs_note_body: `Admin Response: ${response}`,
                hs_timestamp: new Date().toISOString()
              },
              associations: [{
                to: { id: feedbackId },
                types: [{
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 13 // Ticket to Note association
                }]
              }]
            })
          }
        )
      }

      return await ticketUpdateResponse.json()
    } catch (error) {
      console.error('Error updating HubSpot feedback status:', error)
      throw error
    }
  }

  private static mapStatusToHubSpotStage(status: string): string {
    const stageMap: Record<string, string> = {
      'pending': 'new',
      'in_review': 'in_progress',
      'in_progress': 'in_progress',
      'resolved': 'closed',
      'closed': 'closed'
    }
    return stageMap[status] || 'new'
  }

  // Main method to send to configured CMS (now defaults to HubSpot)
  static async sendToCMS(feedback: any) {
    const cmsType = process.env.CMS_TYPE?.toLowerCase() || 'hubspot'
    
    try {
      switch (cmsType) {
        case 'hubspot':
          return await this.sendToHubSpot(feedback)
        case 'strapi':
          return await this.sendToStrapi(feedback)
        case 'contentful':
          return await this.sendToContentful(feedback)
        case 'sanity':
          return await this.sendToSanity(feedback)
        case 'webhook':
          return await this.sendToWebhook(feedback)
        default:
          // Default to HubSpot
          return await this.sendToHubSpot(feedback)
      }
    } catch (error) {
      console.error('CMS integration failed:', error)
      // Don't throw error - feedback should still be saved locally
      return null
    }
  }

  // Legacy methods for other CMS platforms (keeping for compatibility)
  static async sendToStrapi(feedback: any) {
    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.warn('Strapi configuration missing')
      return null
    }

    try {
      const response = await fetch(`${process.env.STRAPI_URL}/api/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            title: feedback.title,
            description: feedback.description,
            type: feedback.type,
            category: feedback.category,
            rating: feedback.rating,
            priority: feedback.priority,
            status: feedback.status,
            userEmail: feedback.userEmail,
            userName: feedback.userName,
            relatedPage: feedback.relatedPage,
            relatedJob: feedback.relatedJob,
            relatedTool: feedback.relatedTool,
            tags: feedback.tags,
            isPublic: feedback.isPublic,
            submittedAt: feedback.createdAt
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send feedback to Strapi:', error)
      throw error
    }
  }

  static async sendToContentful(feedback: any) {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
      console.warn('Contentful configuration missing')
      return null
    }

    try {
      const response = await fetch(
        `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'Authorization': `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`,
            'X-Contentful-Content-Type': 'feedback'
          },
          body: JSON.stringify({
            fields: {
              title: { 'en-US': feedback.title },
              description: { 'en-US': feedback.description },
              type: { 'en-US': feedback.type },
              category: { 'en-US': feedback.category },
              rating: { 'en-US': feedback.rating },
              priority: { 'en-US': feedback.priority },
              status: { 'en-US': feedback.status },
              userEmail: { 'en-US': feedback.userEmail },
              userName: { 'en-US': feedback.userName },
              submittedAt: { 'en-US': feedback.createdAt }
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Contentful API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send feedback to Contentful:', error)
      throw error
    }
  }

  static async sendToSanity(feedback: any) {
    if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_TOKEN) {
      console.warn('Sanity configuration missing')
      return null
    }

    try {
      const response = await fetch(
        `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SANITY_TOKEN}`
          },
          body: JSON.stringify({
            mutations: [{
              create: {
                _type: 'feedback',
                title: feedback.title,
                description: feedback.description,
                type: feedback.type,
                category: feedback.category,
                rating: feedback.rating,
                priority: feedback.priority,
                status: feedback.status,
                userEmail: feedback.userEmail,
                userName: feedback.userName,
                relatedPage: feedback.relatedPage,
                relatedJob: feedback.relatedJob,
                relatedTool: feedback.relatedTool,
                tags: feedback.tags,
                isPublic: feedback.isPublic,
                submittedAt: feedback.createdAt
              }
            }]
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Sanity API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send feedback to Sanity:', error)
      throw error
    }
  }

  static async sendToWebhook(feedback: any) {
    if (!process.env.CMS_WEBHOOK_URL) {
      console.warn('CMS webhook URL not configured')
      return null
    }

    try {
      const response = await fetch(process.env.CMS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.CMS_WEBHOOK_SECRET || '',
          'User-Agent': 'ThriveWithAI-Feedback-System'
        },
        body: JSON.stringify({
          source: 'ThriveWithAI',
          type: 'feedback',
          data: feedback,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send feedback to webhook:', error)
      throw error
    }
  }
}