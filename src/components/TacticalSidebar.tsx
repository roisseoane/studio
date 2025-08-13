"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, User, Shield, PenSquare } from "lucide-react";

const TACTICAL_BUTTONS = [
    { id: "players", icon: User },
    { id: "formations", icon: Shield },
    { id: "draw", icon: PenSquare },
];

export function TacticalSidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="absolute bottom-4 right-4 z-40 flex flex-col items-center">
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden mb-2",
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg rounded-full p-2 flex flex-col gap-2">
                    {TACTICAL_BUTTONS.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            size="icon"
                            className="w-12 h-12 rounded-full text-muted-foreground hover:bg-muted/50"
                        >
                            <item.icon className="h-6 w-6" />
                        </Button>
                    ))}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "w-12 h-12 rounded-full text-muted-foreground hover:bg-muted/50",
                    isExpanded ? "bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg" : "bg-transparent border-none shadow-none"
                )}
            >
                <Menu className="h-6 w-6" />
            </Button>
        </div>
    );
}