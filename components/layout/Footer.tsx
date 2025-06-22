import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-8 py-12 md:flex-row">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">ThriveWithAI</h3>
          <p className="max-w-xs text-sm text-muted-foreground">
            Empowering professionals to embrace AI tools and thrive in the future of work. Learn, adapt, and succeed with artificial intelligence.
          </p>
        </div>
        
        <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                Jobs
              </Link>
              <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                Tools
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/resources/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                Getting Started
              </Link>
              <Link href="/resources/ai-ethics" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Ethics
              </Link>
              <Link href="/resources/best-practices" className="text-muted-foreground hover:text-foreground transition-colors">
                Best Practices
              </Link>
              <Link href="/resources/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Community</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
                Feedback & Reviews
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Support
              </Link>
              <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Glossary
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:h-16 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} ThriveWithAI. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}