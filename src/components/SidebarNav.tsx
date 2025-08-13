"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card p-4 h-screen sticky top-0 border-r">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">ScreenFlow</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
