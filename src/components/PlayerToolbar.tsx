"use client";
import { ScrollArea } from "./ui/scroll-area";
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
        "absolute top-0 right-[-80px] h-full w-[60px] bg-white/5 backdrop-blur-[30px] border border-border/50 shadow-lg rounded-lg z-20 transition-all duration-300 ease-in-out flex flex-col items-center py-4",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col items-center gap-4 px-2">
          {players.map((player) => (
            <div
              key={player.id}
              draggable
              onDragStart={(e) => onDragStart(e, player)}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing"
              title={player.name}
            >
              {player.name.substring(0, 1)}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
