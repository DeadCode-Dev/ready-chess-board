import { ChessBoard } from "@/components/ChessBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary">Chess Game</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Play with a friend • Full chess rules • Based on Lichess
          </p>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <ChessBoard />
      </main>

      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with chess.js • All standard chess rules implemented</p>
          <p className="mt-1">Castling • En Passant • Pawn Promotion • Check • Checkmate</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
