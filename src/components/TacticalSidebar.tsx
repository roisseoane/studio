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

interface TacticalSidebarProps {
    onPlayersClick: () => void;
}

export function TacticalSidebar({ onPlayersClick }: TacticalSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleButtonClick = (id: string) => {
        if (id === "players") {
            onPlayersClick();
        }
        // Handle other button clicks if needed
    };

    return (
        <div className="absolute top-[-35px] left-[23px] z-40 flex flex-row items-center">
             <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "w-12 h-12 rounded-full text-white hover:bg-muted/50 bg-white/5 backdrop-blur-[30px] border border-border/50 shadow-lg"
                )}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden ml-2",
                    isExpanded ? "max-w-96 opacity-100" : "max-w-0 opacity-0"
                )}
            >
                <div className="bg-white/5 backdrop-blur-[30px] border border-border/50 shadow-lg rounded-full p-2 flex flex-row gap-2">
                    {TACTICAL_BUTTONS.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleButtonClick(item.id)}
                            className="w-10 h-6 rounded-full text-white hover:bg-muted/50"
                        >
                            <item.icon className="h-6 w-6" />
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}