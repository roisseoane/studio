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
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-40">
            <div
                className={cn(
                    "flex flex-col items-center gap-2 p-2 transition-all duration-300 ease-in-out",
                    "bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg rounded-full"
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-12 h-12 rounded-full text-muted-foreground hover:bg-muted/50"
                >
                    <Menu className="h-6 w-6" />
                </Button>

                <div
                    className={cn(
                        "flex flex-col items-center gap-2 transition-all duration-300 ease-in-out overflow-hidden",
                        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
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
        </div>
    );
}
