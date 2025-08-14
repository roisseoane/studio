"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-4 inset-x-4 max-w-sm mx-auto
                 bg-black/[.25] backdrop-blur-[30px] border border-border/50 shadow-lg rounded-full z-50"
    >
      <div className="flex justify-around items-center p-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-white hover:bg-muted/50"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
