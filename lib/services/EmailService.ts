import nodemailer from 'nodemailer'

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  static async sendFeedbackNotification(feedback: any) {
    const subject = `New ${feedback.type.replace('_', ' ').toUpperCase()}: ${feedback.title}`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Feedback Received
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #007bff;">
            ${feedback.title}
          </h3>
          <p style="margin: 5px 0;"><strong>Type:</strong> ${feedback.type.replace('_', ' ')}</p>
          <p style="margin: 5px 0;"><strong>Category:</strong> ${feedback.category}</p>
          <p style="margin: 5px 0;"><strong>Priority:</strong> ${feedback.priority}</p>
          ${feedback.rating ? `<p style="margin: 5px 0;"><strong>Rating:</strong> ${'★'.repeat(feedback.rating)}${'☆'.repeat(5-feedback.rating)}</p>` : ''}
        </div>

        <div style="margin: 20px 0;">
          <h4 style="color: #333;">Description:</h4>
          <p style="background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
            ${feedback.description}
          </p>
        </div>

        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 10px 0; color: #333;">User Information:</h4>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${feedback.userName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${feedback.userEmail}</p>
          ${feedback.relatedPage ? `<p style="margin: 5px 0;"><strong>Page:</strong> ${feedback.relatedPage}</p>` : ''}
          ${feedback.relatedJob ? `<p style="margin: 5px 0;"><strong>Related Job:</strong> ${feedback.relatedJob}</p>` : ''}
          ${feedback.relatedTool ? `<p style="margin: 5px 0;"><strong>Related Tool:</strong> ${feedback.relatedTool}</p>` : ''}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/admin/feedback/${feedback._id}" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View in Admin Panel
          </a>
        </div>

        <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 30px; color: #6c757d; font-size: 12px;">
          <p>This email was sent automatically from ThriveWithAI feedback system.</p>
          <p>Submitted on: ${new Date(feedback.createdAt).toLocaleString()}</p>
        </div>
      </div>
    `

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@thrivewith.ai',
        to: process.env.ADMIN_EMAIL || 'admin@thrivewith.ai',
        subject,
        html
      })
    } catch (error) {
      console.error('Failed to send feedback notification email:', error)
      throw error
    }
  }

  static async sendFeedbackResponse(feedback: any, response: string) {
    const subject = `Response to your ${feedback.type.replace('_', ' ')}: ${feedback.title}`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Thank you for your feedback!
        </h2>
        
        <p style="font-size: 16px; color: #333;">Hi ${feedback.userName},</p>
        
        <p style="font-size: 16px; color: #333;">
          We've reviewed your ${feedback.type.replace('_', ' ')} and wanted to follow up with you.
        </p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #007bff;">Your Original Feedback:</h3>
          <p style="margin: 5px 0;"><strong>${feedback.title}</strong></p>
          <p style="margin: 10px 0; font-style: italic;">"${feedback.description}"</p>
        </div>

        <div style="background: white; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
          <h4 style="margin: 0 0 15px 0; color: #28a745;">Our Response:</h4>
          <p style="line-height: 1.6; color: #333;">${response}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/feedback" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Submit More Feedback
          </a>
        </div>

        <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 30px; color: #6c757d; font-size: 14px;">
          <p>Thank you for helping us improve ThriveWithAI!</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p style="margin-top: 20px;">
            Best regards,<br>
            The ThriveWithAI Team
          </p>
        </div>
      </div>
    `

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || 'support@thrivewith.ai',
        to: feedback.userEmail,
        subject,
        html
      })
    } catch (error) {
      console.error('Failed to send feedback response email:', error)
      throw error
    }
  }
}