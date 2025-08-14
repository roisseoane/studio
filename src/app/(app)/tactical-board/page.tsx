"use client";

import { useState } from "react";
import { TacticalBoard } from "@/components/TacticalBoard";
import { PlayersPanel } from "@/components/PlayersPanel";
import { TacticalSidebar } from "@/components/TacticalSidebar";

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

export default function TacticalBoardPage() {
    const [selectedPlayers, setSelectedPlayers] = useState(
        players.reduce((acc, player) => ({ ...acc, [player.id]: true }), {} as Record<number, boolean>)
    );
    const [isPlayersPanelOpen, setIsPlayersPanelOpen] = useState(false);

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

    const assigned = assignPlayers();

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-grow relative flex items-center justify-center p-4">
                 <div className="w-full max-w-[400px] aspect-[2/3] rounded-lg shadow-2xl p-2 relative">
                    <TacticalSidebar onPlayersClick={handleTogglePlayersPanel} />
                    <TacticalBoard assignments={assigned} isBlurred={isPlayersPanelOpen} />
                    <PlayersPanel
                        isOpen={isPlayersPanelOpen}
                        players={players}
                        selectedPlayers={selectedPlayers}
                        onTogglePlayer={handleTogglePlayer}
                    />
                </div>
            </div>
        </div>
    );
}
