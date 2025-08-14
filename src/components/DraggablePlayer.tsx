"use client";

import { PlacedPlayer } from "@/app/(app)/tactical-board/page";

interface DraggablePlayerProps {
    player: PlacedPlayer;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function DraggablePlayer({ player, onDragStart }: DraggablePlayerProps) {
    return (
        <div
            draggable
            onDragStart={onDragStart}
            className="absolute w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing z-10"
            style={{
                left: `calc(${player.x}% - 20px)`,
                top: `calc(${player.y}% - 20px)`,
            }}
            title={player.name}
        >
            {player.name.substring(0, 1)}
        </div>
    );
}
