"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
  <div className="relative w-full h-full" style={{ backgroundColor: "#a0c4ff" }}>
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="600" fill="none" />
      {/* Outer lines */}
      <rect x="20" y="20" width="360" height="560" stroke="white" strokeWidth="2" fill="none" />
      {/* Midfield line */}
      <line x1="20" y1="300" x2="380" y2="300" stroke="white" strokeWidth="2" />
      {/* Center circle */}
      <circle cx="200" cy="300" r="60" stroke="white" strokeWidth="2" fill="none" />
      {/* Center spot */}
      <circle cx="200" cy="300" r="3" fill="white" />
      {/* Penalty areas */}
      <rect x="80" y="20" width="240" height="100" stroke="white" strokeWidth="2" fill="none" />
      <rect x="80" y="480" width="240" height="100" stroke="white" strokeWidth="2" fill="none" />
       {/* Penalty spots */}
      <circle cx="200" cy="80" r="3" fill="white" />
      <circle cx="200" cy="520" r="3" fill="white" />
    </svg>
  </div>
);

const PlayerChip = ({ name, isSelected, onToggle }) => (
  <div
    onClick={onToggle}
    className={cn(
      "rounded-full px-4 py-2 text-white cursor-pointer transition-colors",
      isSelected ? "bg-[#00aaff] border-[#00aaff]" : "bg-gray-500/50"
    )}
  >
    {name}
  </div>
);

const PositionCard = ({ position, titular, suplentes }) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
      style={{ top: position.top, left: position.left }}
    >
      <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {position.name}
      </div>
      <div className="bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full shadow-md min-w-[100px] text-center">
        {titular || "Vacante"}
      </div>
      <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md min-w-[120px] text-center truncate">
        {suplentes.length > 0 ? suplentes.join(', ') : 'Sin suplentes'}
      </div>
    </div>
  );
};


export default function TacticalBoardPage() {
  const [selectedPlayers, setSelectedPlayers] = useState(
    players.reduce((acc, player) => ({ ...acc, [player.id]: true }), {})
  );

  const togglePlayer = (playerId) => {
    setSelectedPlayers((prev) => ({ ...prev, [playerId]: !prev[playerId] }));
  };
  
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
        switch(player.position) {
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
    <div className="flex flex-col md:flex-row h-full bg-card">
      <div className="flex-grow relative order-2 md:order-1">
        <FutsalField />
        <div className="absolute inset-0">
          <PositionCard position={positions.POR} titular={assigned.POR.titular} suplentes={assigned.POR.suplentes} />
          <PositionCard position={positions.CIE} titular={assigned.CIE.titular} suplentes={assigned.CIE.suplentes} />
          <PositionCard position={positions["ALA-I"]} titular={assigned.ALA.titular[0]} suplentes={assigned.ALA.suplentes} />
          <PositionCard position={positions["ALA-D"]} titular={assigned.ALA.titular[1]} suplentes={[]} />
          <PositionCard position={positions.PIV} titular={assigned.PIV.titular} suplentes={assigned.PIV.suplentes} />
        </div>
        <Button className="absolute top-4 right-4">Pizarra Táctica</Button>
      </div>

      <div className="order-1 md:order-2 md:w-80 p-4 border-b md:border-l">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Jugadores Convocados</h2>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48 md:h-[calc(100vh-200px)]">
              <div className="flex flex-row md:flex-col gap-4 flex-wrap">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`player-${player.id}`}
                      checked={selectedPlayers[player.id]}
                      onCheckedChange={() => togglePlayer(player.id)}
                    />
                    <Label
                      htmlFor={`player-${player.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {player.name}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="md:hidden order-3 p-4 bg-background/70 backdrop-blur-xl">
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-4">
            {players.map((player) => (
                <PlayerChip
                key={player.id}
                name={player.name}
                isSelected={selectedPlayers[player.id]}
                onToggle={() => togglePlayer(player.id)}
                />
            ))}
            </div>
        </ScrollArea>
      </div>
    </div>
  );
}
