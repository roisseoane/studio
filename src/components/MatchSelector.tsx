"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Match = {
  id: string;
  opponent: string;
  date: string;
};

interface MatchSelectorProps {
  matches: Match[];
  selectedMatchId: string;
  onSelectMatch: (id: string) => void;
}

export function MatchSelector({
  matches,
  selectedMatchId,
  onSelectMatch,
}: MatchSelectorProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {/* Global Chip */}
          <CarouselItem className="basis-auto">
            <Button
              variant="outline"
              className={cn(
                "transition-all duration-300 ease-in-out whitespace-nowrap",
                selectedMatchId === "global"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground hover:bg-white/10 hover:text-white"
              )}
              onClick={() => onSelectMatch("global")}
            >
              Global
            </Button>
          </CarouselItem>

          {/* Match Chips */}
          {matches.map((match) => (
            <CarouselItem key={match.id} className="basis-auto">
              <Button
                variant="outline"
                className={cn(
                  "transition-all duration-300 ease-in-out whitespace-nowrap flex flex-col h-auto py-2 px-4",
                  selectedMatchId === match.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground hover:bg-white/10 hover:text-white"
                )}
                onClick={() => onSelectMatch(match.id)}
              >
                <span>Vs. {match.opponent}</span>
                <span className="text-xs opacity-70">
                  {formatDate(match.date)}
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
