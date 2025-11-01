import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CapturedPiecesProps {
  whiteCaptured: string[];
  blackCaptured: string[];
}

export const CapturedPieces = ({ whiteCaptured, blackCaptured }: CapturedPiecesProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Captured Pieces</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2 text-muted-foreground">White captured:</p>
          <div className="flex flex-wrap gap-1 min-h-[40px] bg-muted/30 rounded p-2">
            {whiteCaptured.map((piece, index) => (
              <span key={index} className="text-2xl">
                {piece}
              </span>
            ))}
            {whiteCaptured.length === 0 && (
              <span className="text-sm text-muted-foreground">None</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2 text-muted-foreground">Black captured:</p>
          <div className="flex flex-wrap gap-1 min-h-[40px] bg-muted/30 rounded p-2">
            {blackCaptured.map((piece, index) => (
              <span key={index} className="text-2xl">
                {piece}
              </span>
            ))}
            {blackCaptured.length === 0 && (
              <span className="text-sm text-muted-foreground">None</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
