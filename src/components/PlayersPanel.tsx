"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Player {
    id: number;
    name: string;
    position: string;
    avatarUrl: string;
}

interface PlayersPanelProps {
    isOpen: boolean;
    players: Player[];
    selectedPlayers: Record<number, boolean>;
    onTogglePlayer: (id: number) => void;
}

export function PlayersPanel({ isOpen, players, selectedPlayers, onTogglePlayer }: PlayersPanelProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-4">
                {players.map((player, index) => (
                    <div
                        key={player.id}
                        className="flex flex-col items-center gap-2 cursor-pointer group animate-pop-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => onTogglePlayer(player.id)}
                    >
                        <Avatar className={cn(
                            "w-20 h-20 border-4 transition-all duration-300",
                            selectedPlayers[player.id] ? "border-green-500 opacity-100" : "border-red-500 opacity-60 grayscale"
                        )}>
                            <AvatarImage src={player.avatarUrl} alt={player.name} data-ai-hint="player photo" />
                            <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-white font-medium text-sm">{player.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
