import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="container flex h-[calc(100vh-16rem)] flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-muted">404</h1>
        <h2 className="mt-4 text-2xl font-bold">Page not found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              Go back home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/jobs">
              Browse jobs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}