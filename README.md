# ThriveWithAI - AI Productivity Platform

A comprehensive platform helping professionals master AI tools for career growth and productivity enhancement.

## 🚀 Features

### 🔐 **Multi-Provider Authentication**
- **Email/Password** with secure bcrypt hashing
- **Google OAuth** for seamless sign-in
- **Apple ID** for iOS users
- **Microsoft/Outlook** for enterprise users
- **Secure session management** with NextAuth.js

### 💳 **RevenueCat Subscription System**
- **Free Tier**: Access to basic content (1 prompt example, 1 guide per job)
- **Premium Tier**: Unlimited access to all content and features
- **RevenueCat Integration** for secure payment processing
- **Content Gating** based on subscription status
- **Restore Purchases** functionality
- **Real-time subscription status updates**

### 📝 **Feedback & Review System**
- **Multi-type feedback**: Reviews, issues, content requests, feature requests, bug reports
- **HubSpot CMS Integration** for professional feedback management
- **Automated email notifications** to admin and users
- **Public review display** with voting system
- **Admin dashboard** for response management

### 🎯 **Content & Features**
- **Job-Specific AI Guides** for 6+ professions
- **Prompt Templates** with copy-to-clipboard functionality
- **AI Tools Directory** with detailed reviews
- **Use Case Tutorials** with step-by-step instructions
- **Resource Library** with best practices and ethics guides

### 🛡️ **Security & Best Practices**
- **Rate limiting** on authentication endpoints
- **Input validation** with Zod schemas
- **HTTPS enforcement** in production
- **Secure cookies** with HttpOnly and SameSite flags
- **SQL injection prevention** through Mongoose
- **XSS protection** through React's built-in escaping

## 🏗️ **Architecture**

### **MVC Pattern Implementation**
- **Models**: MongoDB with Mongoose ODM
- **Views**: React components with TypeScript
- **Controllers**: Business logic separation
- **Error Handling**: Comprehensive error boundaries

### **Technology Stack**
- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with multiple providers
- **Payments**: RevenueCat integration with @revenuecat/purchases-js
- **CMS**: HubSpot integration for feedback management
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS with custom design system

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- MongoDB database
- OAuth provider credentials (Google, Apple, Microsoft)
- RevenueCat account with configured products
- HubSpot account with API access

### **Installation**

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd thrivewith-ai
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-random-secret

# Database
MONGODB_URI=mongodb://localhost:27017/thrivewith-ai

# RevenueCat
NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY=your-revenuecat-public-key
REVENUECAT_SECRET_KEY=your-revenuecat-secret-key

# HubSpot CMS Integration
CMS_TYPE=hubspot
HUBSPOT_ACCESS_TOKEN=your-hubspot-private-app-access-token

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@thrivewith.ai

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

APPLE_ID=your-apple-id
APPLE_SECRET=your-apple-secret

AZURE_AD_CLIENT_ID=your-azure-ad-client-id
AZURE_AD_CLIENT_SECRET=your-azure-ad-client-secret
AZURE_AD_TENANT_ID=your-azure-ad-tenant-id

# Admin Access
ADMIN_EMAILS=admin@thrivewith.ai,manager@thrivewith.ai
```

3. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 💳 **RevenueCat Setup**

### **1. Create RevenueCat Account**
1. Sign up at [RevenueCat](https://www.revenuecat.com/)
2. Create a new project
3. Add your app (Web platform)

### **2. Configure Products**
1. Go to Products tab in RevenueCat dashboard
2. Create products:
   - **Product ID**: `premium_monthly`
   - **Type**: Subscription
   - **Duration**: 1 month
   - **Price**: $19.99 (or your preferred price)

   - **Product ID**: `premium_yearly` (optional)
   - **Type**: Subscription  
   - **Duration**: 1 year
   - **Price**: $199.99 (or your preferred price)

### **3. Configure Entitlements**
1. Go to Entitlements tab
2. Create entitlement:
   - **Entitlement ID**: `premium`
   - **Products**: Add both monthly and yearly products

### **4. Get API Keys**
1. Go to API Keys tab
2. Copy your **Public Key** → `NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY`
3. Copy your **Secret Key** → `REVENUECAT_SECRET_KEY`

### **5. Configure Webhooks**
1. Go to Integrations → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/subscription/webhook`
3. Select events: `INITIAL_PURCHASE`, `RENEWAL`, `CANCELLATION`, `EXPIRATION`

### **6. Test Configuration**
1. Use RevenueCat's test mode for development
2. Test purchases with sandbox accounts
3. Verify webhook delivery in RevenueCat dashboard

## 🔧 **HubSpot Setup**

### **Create Private App**
1. Go to HubSpot Settings → Integrations → Private Apps
2. Create a new private app
3. Configure scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.tickets.read`
   - `crm.objects.tickets.write`
   - `crm.objects.notes.read`
   - `crm.objects.notes.write`

### **Configure Pipelines**
1. Go to Settings → Objects → Tickets
2. Create a "Support Pipeline" with stages:
   - New
   - In Progress
   - Waiting on Customer
   - Closed

## 🔧 **OAuth Provider Setup**

### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### **Apple ID**
1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create a new App ID and Service ID
3. Configure Sign in with Apple
4. Generate private key and client secret

### **Microsoft Azure AD**
1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application in Azure AD
3. Configure authentication and permissions
4. Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`

## 📧 **Email Configuration**

### **Gmail Setup**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `SMTP_PASSWORD`

## 🔒 **Security Features**

### **Authentication Security**
- Strong password requirements (8+ chars, mixed case, numbers, symbols)
- Rate limiting (5 attempts per 15 minutes)
- Secure session management with JWT
- OAuth integration with major providers

### **Subscription Security**
- Webhook signature verification
- Secure payment processing through RevenueCat
- No direct credit card handling
- Real-time subscription status synchronization

### **Data Protection**
- Input validation with Zod schemas
- SQL injection prevention through Mongoose
- XSS protection through React
- CSRF protection with NextAuth.js

## 📁 **Project Structure**

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── feedback/      # Feedback management
│   │   └── subscription/  # Subscription webhooks & updates
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── jobs/              # Job-specific pages
│   ├── tools/             # AI tools directory
│   ├── resources/         # Resource library
│   ├── feedback/          # Feedback pages
│   └── subscription/      # Subscription management
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── auth/              # Authentication components
│   ├── feedback/          # Feedback components
│   ├── layout/            # Layout components
│   ├── subscription/      # Subscription components
│   ├── ui/                # UI components (shadcn/ui)
│   └── views/             # Page view components
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication utilities
│   ├── controllers/       # Business logic controllers
│   ├── database/          # Database models and connection
│   ├── data/              # Static data and content
│   ├── services/          # External service integrations
│   ├── subscription/      # Subscription utilities
│   └── validation/        # Input validation schemas
└── types/                 # TypeScript type definitions
```

## 💳 **Subscription Flow**

### **User Journey**
1. User visits upgrade page
2. RevenueCat loads available products
3. User selects subscription plan
4. RevenueCat handles payment processing
5. Webhook updates user subscription status
6. User gains immediate access to premium content

### **Technical Flow**
1. `RevenueCatProvider` initializes with user ID
2. `SubscriptionPlans` component displays available packages
3. `PurchaseButton` triggers RevenueCat purchase flow
4. Purchase completion updates local state
5. API call updates database subscription status
6. UI refreshes to show premium access

## 🚀 **Deployment**

### **Environment Variables for Production**
```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
MONGODB_URI=your-production-mongodb-uri
NEXT_PUBLIC_REVENUECAT_PUBLIC_KEY=your-production-revenuecat-public-key
REVENUECAT_SECRET_KEY=your-production-revenuecat-secret-key
HUBSPOT_ACCESS_TOKEN=your-production-hubspot-token
# ... other production credentials
```

### **Build and Deploy**
```bash
npm run build
npm start
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

For support and questions:
- Email: support@thrivewith.ai
- Feedback System: Use the built-in feedback form
- Documentation: [docs.thrivewith.ai](https://docs.thrivewith.ai)
- Issues: GitHub Issues

---

**Built with ❤️ for professionals ready to thrive with AI**