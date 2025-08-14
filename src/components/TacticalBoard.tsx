"use client";

import { cn } from "@/lib/utils";

const positions = {
  POR: { top: "85%", left: "50%", name: "POR" },
  CIE: { top: "65%", left: "50%", name: "CIE" },
  "ALA-D": { top: "45%", left: "75%", name: "ALA" },
  "ALA-I": { top: "45%", left: "25%", name: "ALA" },
  PIV: { top: "25%", left: "50%", name: "PIV" },
};

const FutsalFieldSvg = () => (
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

const PositionCard = ({ position, titular, suplentes }: { position: { top: string; left: string; name: string; }; titular: string | null; suplentes: string[] }) => {
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

interface TacticalBoardAssignments {
    POR: { titular: string | null; suplentes: string[] };
    CIE: { titular: string | null; suplentes: string[] };
    ALA: { titular: string[]; suplentes: string[] };
    PIV: { titular: string | null; suplentes: string[] };
}

interface TacticalBoardProps {
    assignments?: TacticalBoardAssignments;
    isBlurred?: boolean;
}

export function TacticalBoard({ assignments, isBlurred = false }: TacticalBoardProps) {
    return (
        <div className={cn(
            "w-full h-full transition-all duration-500 absolute inset-0",
            isBlurred && "blur-lg brightness-50"
        )}>
            <FutsalFieldSvg />
            {assignments && (
                <div className="absolute inset-0">
                    <PositionCard position={positions.POR} titular={assignments.POR.titular} suplentes={assignments.POR.suplentes} />
                    <PositionCard position={positions.CIE} titular={assignments.CIE.titular} suplentes={assignments.CIE.suplentes} />
                    <PositionCard position={positions["ALA-I"]} titular={assignments.ALA.titular[0] || null} suplentes={assignments.ALA.suplentes} />
                    <PositionCard position={positions["ALA-D"]} titular={assignments.ALA.titular[1] || null} suplentes={[]} />
                    <PositionCard position={positions.PIV} titular={assignments.PIV.titular} suplentes={assignments.PIV.suplentes} />
                </div>
            )}
        </div>
    );
}
