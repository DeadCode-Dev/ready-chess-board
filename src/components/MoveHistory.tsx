import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface MoveHistoryProps {
  moves: string[];
}

export const MoveHistory = ({ moves }: MoveHistoryProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full rounded border bg-muted/30 p-3">
          {moves.length === 0 ? (
            <p className="text-sm text-muted-foreground">No moves yet</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {moves.map((move, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm font-mono bg-background px-2 py-1 rounded"
                >
                  <span className="text-muted-foreground w-8">
                    {Math.floor(index / 2) + 1}.
                    {index % 2 === 1 ? ".." : ""}
                  </span>
                  <span className="font-semibold">{move}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
