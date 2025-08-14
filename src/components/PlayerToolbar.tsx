"use client";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Player, PlacedPlayer } from "@/app/(app)/tactical-board/page";

interface PlayerToolbarProps {
  isVisible: boolean;
  players: Player[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, player: Player) => void;
  onPlayerReturn: (player: PlacedPlayer) => void;
}

export function PlayerToolbar({ isVisible, players, onDragStart, onPlayerReturn }: PlayerToolbarProps) {

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const playerDataString = e.dataTransfer.getData("application/json");
    if (!playerDataString) return;
    const player = JSON.parse(playerDataString) as PlacedPlayer;
    if (player.x !== undefined && player.y !== undefined) {
      onPlayerReturn(player);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  return (
    <div
      className={cn(
        "absolute bg-white/5 backdrop-blur-[30px] border border-border/50 shadow-lg z-20 transition-all duration-300 ease-in-out flex items-center",
        "bottom-0 w-full h-[70px] rounded-full",
        "md:top-0 md:left-auto md:right-0 md:w-[60px] md:h-full md:flex-col md:rounded-lg",
        "translate-y-[calc(100%+5px)] md:translate-y-0",
        "md:translate-x-[calc(100%+5px)]",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <ScrollArea className="w-full h-full">
        <div className="flex md:flex-col items-center justify-center gap-4 h-full w-full px-4">
            {players.map((player) => (
                <div
                key={player.id}
                draggable
                onDragStart={(e) => onDragStart(e, player)}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing flex-shrink-0"
                title={player.name}
                >
                {player.name.substring(0, 1)}
                </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" className="md:hidden" />
        <ScrollBar orientation="vertical" className="hidden md:flex" />
      </ScrollArea>
    </div>
  );
}
