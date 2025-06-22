import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarProps {
  className?: string
  items: {
    title: string
    href: string
  }[]
  activeHref?: string
}

export default function Sidebar({ className, items, activeHref }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Contents
          </h2>
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  item.href === activeHref
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }