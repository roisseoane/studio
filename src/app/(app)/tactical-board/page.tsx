"use client";

import { useState } from "react";
import { TacticalBoard } from "@/components/TacticalBoard";
import { PlayersPanel } from "@/components/PlayersPanel";
import { TacticalSidebar } from "@/components/TacticalSidebar";
import { PlayerToolbar } from "@/components/PlayerToolbar";
import { DraggablePlayer } from "@/components/DraggablePlayer";

const players = [
  { id: 1, name: "Juan", position: "POR", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 2, name: "Pedro", position: "CIE", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 3, name: "Luis", position: "CIE", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 4, name: "Carlos", position: "ALA", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 5, name: "Miguel", position: "ALA", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 6, name: "Jorge", position: "PIV", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 7, name: "Andrés", position: "POR", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 8, name: "Diego", position: "CIE", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 9, name: "Pablo", position: "ALA", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 10, name: "Sergio", position: "PIV", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 11, name: "Javier", position: "ALA", avatarUrl: "https://placehold.co/100x100.png" },
  { id: 12, name: "Marcos", position: "CIE", avatarUrl: "https://placehold.co/100x100.png" },
];

export type Player = typeof players[0];

export interface PlacedPlayer extends Player {
    x: number;
    y: number;
}

export default function TacticalBoardPage() {
    const [selectedPlayers, setSelectedPlayers] = useState(
        players.reduce((acc, player) => ({ ...acc, [player.id]: true }), {} as Record<number, boolean>)
    );
    const [isPlayersPanelOpen, setIsPlayersPanelOpen] = useState(false);
    const [sidebarMode, setSidebarMode] = useState<"default" | "draw">("default");

    const [placedPlayers, setPlacedPlayers] = useState<PlacedPlayer[]>([]);

    const handleTogglePlayer = (playerId: number) => {
        setSelectedPlayers(prev => ({ ...prev, [playerId]: !prev[playerId] }));
    };

    const handleTogglePlayersPanel = () => {
        setIsPlayersPanelOpen(prev => !prev);
    }

    const availablePlayers = players.filter((p) => selectedPlayers[p.id]);

    const assignPlayers = () => {
        const assignments = {
            POR: { titular: null as string | null, suplentes: [] as string[] },
            CIE: { titular: null as string | null, suplentes: [] as string[] },
            ALA: { titular: [] as string[], suplentes: [] as string[] },
            PIV: { titular: null as string | null, suplentes: [] as string[] },
        };

        const unassigned = [...availablePlayers];

        const assignByPosition = (pos: string) => {
            for (let i = 0; i < unassigned.length; i++) {
                if (unassigned[i].position === pos) {
                    const player = unassigned.splice(i, 1)[0];
                    return player.name;
                }
            }
            return null;
        };

        assignments.POR.titular = assignByPosition("POR");
        assignments.CIE.titular = assignByPosition("CIE");
        assignments.PIV.titular = assignByPosition("PIV");
        const ala1 = assignByPosition("ALA");
        if (ala1) assignments.ALA.titular.push(ala1);
        const ala2 = assignByPosition("ALA");
        if(ala2) assignments.ALA.titular.push(ala2);

        unassigned.forEach(player => {
            switch (player.position) {
                case "POR": assignments.POR.suplentes.push(player.name); break;
                case "CIE": assignments.CIE.suplentes.push(player.name); break;
                case "ALA": assignments.ALA.suplentes.push(player.name); break;
                case "PIV": assignments.PIV.suplentes.push(player.name); break;
            }
        });
        return assignments;
    };

    const handleSidebarAction = (action: string) => {
        switch (action) {
            case "players":
                handleTogglePlayersPanel();
                break;
            case "draw":
                setSidebarMode(prev => prev === "default" ? "draw" : "default");
                break;
            case "formations":
                 // TODO: Implement formations logic
                break;
            case "record":
                 // TODO: Implement record logic
                break;
            case "play":
                 // TODO: Implement play logic
                break;
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player | PlacedPlayer) => {
        const playerData = JSON.stringify(player);
        e.dataTransfer.setData("application/json", playerData);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const playerDataString = e.dataTransfer.getData("application/json");
        if (!playerDataString) return;

        const player = JSON.parse(playerDataString) as Player | PlacedPlayer;
        const boardRect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - boardRect.left) / boardRect.width) * 100;
        const y = ((e.clientY - boardRect.top) / boardRect.height) * 100;

        setPlacedPlayers(prev => {
            const existingPlayerIndex = prev.findIndex(p => p.id === player.id);
            if (existingPlayerIndex > -1) {
                const updatedPlayers = [...prev];
                updatedPlayers[existingPlayerIndex] = { ...updatedPlayers[existingPlayerIndex], x, y };
                return updatedPlayers;
            } else {
                 return [...prev, { ...player, x, y }];
            }
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleReturnPlayer = (player: PlacedPlayer) => {
        setPlacedPlayers(prev => prev.filter(p => p.id !== player.id));
    };

    const assigned = assignPlayers();
    const toolbarPlayers = players.filter(p => !placedPlayers.some(pp => pp.id === p.id));


    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-grow relative flex items-center justify-center p-4">
                 <div className="w-full max-w-[400px] aspect-[2/3] rounded-lg shadow-2xl relative flex flex-col items-center">
                    <TacticalSidebar 
                        onAction={handleSidebarAction} 
                        mode={sidebarMode} 
                        setMode={setSidebarMode}
                    />
                    <div className="relative w-full h-full flex flex-col gap-[5px]">
                        <div 
                            className="relative w-full h-full"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <TacticalBoard 
                                assignments={sidebarMode === 'default' ? assigned : undefined} 
                                isBlurred={isPlayersPanelOpen}
                            />
                            {placedPlayers.map(player => (
                                <DraggablePlayer
                                    key={player.id}
                                    player={player}
                                    onDragStart={(e) => handleDragStart(e, player)}
                                />
                            ))}
                        </div>

                        <PlayersPanel
                            isOpen={isPlayersPanelOpen}
                            players={players}
                            selectedPlayers={selectedPlayers}
                            onTogglePlayer={handleTogglePlayer}
                        />
                    </div>
                     <PlayerToolbar
                        isVisible={sidebarMode === "draw"}
                        players={toolbarPlayers}
                        onDragStart={handleDragStart}
                        onPlayerReturn={handleReturnPlayer}
                    />
                </div>
            </div>
        </div>
    );
}
