"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { MatchSelector } from "@/components/MatchSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const matches = [
  { id: "match-1", opponent: "Rivales FC", date: "2025-08-21" },
  { id: "match-2", opponent: "Los Titos", date: "2025-08-14" },
  { id: "match-3", opponent: "Amateur FC", date: "2025-08-07" },
  { id: "match-4", opponent: "Inter Mitente", date: "2025-07-31" },
  { id: "match-5", opponent: "Los Primos", date: "2025-07-24" },
];

export default function StatsPage() {
  const [selectedMatchId, setSelectedMatchId] = useState("global");

  return (
    <div className="flex flex-col h-full text-foreground p-4 md:p-6">
      <header className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <MatchSelector
          matches={matches}
          selectedMatchId={selectedMatchId}
          onSelectMatch={setSelectedMatchId}
        />
        <div className="flex items-center gap-2">
           <Button variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground border-none">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Partido
          </Button>
          <div className={cn(
            "transition-opacity duration-300",
            selectedMatchId === 'global' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center rounded-lg border border-dashed border-border/30">
          <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                  {selectedMatchId === 'global' 
                      ? "Estadísticas Globales" 
                      : `Estadísticas de ${matches.find(m => m.id === selectedMatchId)?.opponent}`
                  }
              </h2>
              <p className="text-muted-foreground">
                  Próximamente: aquí se mostrará la tabla de estadísticas.
              </p>
          </div>
      </main>
    </div>
  );
}
