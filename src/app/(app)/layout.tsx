import type { PropsWithChildren } from "react";
import { BottomNav } from "@/components/BottomNav";
import { SidebarNav } from "@/components/SidebarNav";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 md:p-8 min-h-screen pb-24 md:pb-8">
            {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
