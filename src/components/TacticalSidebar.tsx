"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, User, Shield, PenSquare, CircleDot, Play } from "lucide-react";

const NORMAL_BUTTONS = [
    { id: "players", icon: User },
    { id: "formations", icon: Shield },
];

const DRAW_BUTTONS = [
    { id: "record", icon: CircleDot },
    { id: "play", icon: Play },
];

interface TacticalSidebarProps {
    onAction: (action: string) => void;
    mode: "default" | "draw";
    setMode: (mode: "default" | "draw") => void;
}

export function TacticalSidebar({ onAction, mode, setMode }: TacticalSidebarProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleButtonClick = (id: string) => {
        if (id === 'draw') {
            setMode(mode === 'default' ? 'draw' : 'default');
        } else {
            onAction(id);
        }
    };

    const currentButtons = mode === 'draw' ? DRAW_BUTTONS : NORMAL_BUTTONS;

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
                    {currentButtons.map((item) => (
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
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleButtonClick('draw')}
                        className={cn(
                            "w-10 h-6 rounded-full text-white hover:bg-muted/50",
                            mode === 'draw' && "bg-primary/50 text-primary-foreground"
                        )}
                    >
                        <PenSquare className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
