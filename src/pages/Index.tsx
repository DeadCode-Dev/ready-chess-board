import { ChessBoard } from "@/components/ChessBoard";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b bg-card shadow-md backdrop-blur-sm bg-card/95 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Chess Game
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Play with a friend • Full chess rules • Based on Lichess
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <ChessBoard />
      </main>

      <footer className="border-t bg-card mt-12 shadow-inner transition-all duration-300">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with chess.js • All standard chess rules implemented</p>
          <p className="mt-1">Castling • En Passant • Pawn Promotion • Check • Checkmate</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
