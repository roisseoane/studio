"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TacticalSidebar } from "@/components/TacticalSidebar";


const players = [
  { id: 1, name: "Juan", position: "POR" },
  { id: 2, name: "Pedro", position: "CIE" },
  { id: 3, name: "Luis", position: "CIE" },
  { id: 4, name: "Carlos", position: "ALA" },
  { id: 5, name: "Miguel", position: "ALA" },
  { id: 6, name: "Jorge", position: "PIV" },
  { id: 7, name: "Andrés", position: "POR" },
  { id: 8, name: "Diego", position: "CIE" },
  { id: 9, name: "Pablo", position: "ALA" },
  { id: 10, name: "Sergio", position: "PIV" },
  { id: 11, name: "Javier", position: "ALA" },
  { id: 12, name: "Marcos", position: "CIE" },
];

const positions = {
  POR: { top: "85%", left: "50%", name: "POR" },
  CIE: { top: "65%", left: "50%", name: "CIE" },
  "ALA-D": { top: "45%", left: "75%", name: "ALA" },
  "ALA-I": { top: "45%", left: "25%", name: "ALA" },
  PIV: { top: "25%", left: "50%", name: "PIV" },
};

const FutsalField = () => (
    <div className="relative w-full h-full bg-transparent">
        <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 600"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="400" height="600" fill="none" />
            <rect x="20" y="20" width="360" height="560" stroke="white" strokeWidth="2" fill="none" />
            <line x1="20" y1="300" x2="380" y2="300" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="300" r="60" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="200" cy="300" r="3" fill="white" />
            <rect x="80" y="20" width="240" height="100" stroke="white" strokeWidth="2" fill="none" />
            <rect x="80" y="480" width="240" height="100" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="200" cy="80" r="3" fill="white" />
            <circle cx="200" cy="520" r="3" fill="white" />
        </svg>
    </div>
);

const PlayerChip = ({ name, isSelected, onToggle, id }) => (
    <div
        onClick={onToggle}
        className={cn(
            "flex flex-col items-center gap-2 cursor-pointer transition-all",
            !isSelected && "opacity-50"
        )}
    >
        <Avatar className={cn("h-16 w-16 border-4", isSelected ? "border-primary" : "border-transparent")}>
            <AvatarImage data-ai-hint="profile picture" src={`https://placehold.co/80x80.png?text=${name.charAt(0)}`} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-white">{name}</span>
    </div>
);

const PositionCard = ({ position, titular, suplentes }) => {
    if (!titular) return null;

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
            style={{ top: position.top, left: position.left }}
        >
            <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {position.name}
            </div>
            <div className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full shadow-md min-w-[50px] text-center">
                {titular}
            </div>
            {suplentes.length > 0 && (
                <div className="bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-md min-w-[60px] text-center truncate">
                    {suplentes.join(', ')}
                </div>
            )}
        </div>
    );
};


export default function TacticalBoardPage() {
    const [selectedPlayers, setSelectedPlayers] = useState(
        players.reduce((acc, player) => ({ ...acc, [player.id]: true }), {})
    );

    const availablePlayers = players.filter((p) => selectedPlayers[p.id]);

    const assignPlayers = () => {
        const assignments = {
            POR: { titular: null, suplentes: [] },
            CIE: { titular: null, suplentes: [] },
            ALA: { titular: [], suplentes: [] },
            PIV: { titular: null, suplentes: [] },
        };

        const unassigned = [...availablePlayers];

        const assignByPosition = (pos) => {
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
        assignments.ALA.titular.push(assignByPosition("ALA"));
        assignments.ALA.titular.push(assignByPosition("ALA"));

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
        <div className="flex flex-col h-full bg-card overflow-hidden">
            <div className="flex-grow relative flex items-center justify-center p-4">
                <div className="w-full max-w-[400px] aspect-[2/3] bg-blue-900 rounded-lg shadow-2xl p-2 relative">
                    <FutsalField />
                    <div className="absolute inset-0">
                        <PositionCard position={positions.POR} titular={assigned.POR.titular} suplentes={assigned.POR.suplentes} />
                        <PositionCard position={positions.CIE} titular={assigned.CIE.titular} suplentes={assigned.CIE.suplentes} />
                        <PositionCard position={positions["ALA-I"]} titular={assigned.ALA.titular[0]} suplentes={assigned.ALA.suplentes} />
                        <PositionCard position={positions["ALA-D"]} titular={assigned.ALA.titular[1]} suplentes={[]} />
                        <PositionCard position={positions.PIV} titular={assigned.PIV.titular} suplentes={assigned.PIV.suplentes} />
                    </div>
                    <TacticalSidebar />
                </div>
            </div>
        </div>
    );
}
