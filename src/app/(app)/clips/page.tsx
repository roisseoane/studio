import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function ClipsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="p-8">
          <div className="mx-auto bg-accent rounded-full p-4 w-fit">
            <Clapperboard className="h-12 w-12 text-accent-foreground" />
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <CardTitle className="text-3xl font-bold">Clips</CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
