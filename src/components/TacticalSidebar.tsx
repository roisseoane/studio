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
        <div className="absolute bottom-4 right-4 z-40">
            <div
                className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-300 ease-in-out",
                    isExpanded && "bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg rounded-full p-2"
                )}
            >
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
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "w-12 h-12 rounded-full text-muted-foreground hover:bg-muted/50",
                        !isExpanded && "bg-background/70 backdrop-blur-xl border border-border/50 shadow-lg"
                    )}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
