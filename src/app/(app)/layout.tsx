import type { PropsWithChildren } from "react";
import { BottomNav } from "@/components/BottomNav";
import { SidebarNav } from "@/components/SidebarNav";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-background flex flex-col md:flex-row">
      <SidebarNav />
      <main className="flex-1 flex flex-col">
          {children}
      </main>
      <BottomNav />
    </div>
  );
}
