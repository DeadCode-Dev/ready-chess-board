import { useState, useEffect } from "react";
import { Chess, Square, PieceSymbol, Color } from "chess.js";
import { ChessSquare } from "./ChessSquare";
import { CapturedPieces } from "./CapturedPieces";
import { MoveHistory } from "./MoveHistory";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { PawnNavigationButton } from "./PawnNavigationButton";

const PIECE_SYMBOLS: Record<string, string> = {
  wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔",
  bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚",
};

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

interface GameHistory {
  fen: string;
  moveHistory: string[];
  capturedPieces: { white: string[]; black: string[] };
}

const INITIAL_HISTORY: GameHistory[] = [
  { fen: INITIAL_FEN, moveHistory: [], capturedPieces: { white: [], black: [] } }
];

export const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: string[]; black: string[] }>({
    white: [],
    black: [],
  });
  const [history, setHistory] = useState<GameHistory[]>(INITIAL_HISTORY);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const board = game.board();
  const currentTurn = game.turn();
  const isCheck = game.isCheck();
  const isCheckmate = game.isCheckmate();
  const isStalemate = game.isStalemate();
  const isDraw = game.isDraw();
  const canGoBack = currentMoveIndex > 0;
  const canGoForward = currentMoveIndex < history.length - 1;

  useEffect(() => {
    if (isCheckmate) {
      const winner = currentTurn === "w" ? "Black" : "White";
      toast.success(`Checkmate! ${winner} wins!`, { duration: 5000 });
    } else if (isStalemate) {
      toast.info("Stalemate! Game is a draw.", { duration: 5000 });
    } else if (isDraw) {
      toast.info("Draw!", { duration: 5000 });
    } else if (isCheck) {
      toast.warning("Check!", { duration: 2000 });
    }
  }, [isCheckmate, isStalemate, isDraw, isCheck, currentTurn]);

  const handleSquareClick = (square: Square) => {
    if (selectedSquare) {
      // Try to make a move
      const move = {
        from: selectedSquare,
        to: square,
        promotion: "q" as PieceSymbol, // Always promote to queen for simplicity
      };

      try {
        const result = game.move(move);
        if (result) {
          setLastMove({ from: selectedSquare, to: square });
          const newMoveHistory = [...moveHistory, result.san];
          setMoveHistory(newMoveHistory);
          
          // Update captured pieces
          let newCapturedPieces = { ...capturedPieces };
          if (result.captured) {
            const capturedPiece = `${result.color === "w" ? "b" : "w"}${result.captured}`;
            newCapturedPieces = {
              ...capturedPieces,
              [result.color === "w" ? "black" : "white"]: [
                ...capturedPieces[result.color === "w" ? "black" : "white"],
                capturedPiece,
              ],
            };
            setCapturedPieces(newCapturedPieces);
          }

          const newFen = game.fen();
          // If we're not at the latest move, truncate history
          const newHistory = currentMoveIndex === history.length - 1 
            ? [...history, { fen: newFen, moveHistory: newMoveHistory, capturedPieces: newCapturedPieces }]
            : [...history.slice(0, currentMoveIndex + 1), { fen: newFen, moveHistory: newMoveHistory, capturedPieces: newCapturedPieces }];
          
          setHistory(newHistory);
          setCurrentMoveIndex(newHistory.length - 1);
          setGame(new Chess(game.fen()));
          setSelectedSquare(null);
          setLegalMoves([]);
          return;
        }
      } catch (error) {
        // Invalid move
      }

      // If we couldn't move, try selecting the clicked square instead
      const piece = game.get(square);
      if (piece && piece.color === currentTurn) {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setLegalMoves(moves.map((m) => m.to));
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    } else {
      // Select a piece
      const piece = game.get(square);
      if (piece && piece.color === currentTurn) {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setLegalMoves(moves.map((m) => m.to));
      }
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setHistory(INITIAL_HISTORY);
    setCurrentMoveIndex(0);
    toast.info("Game reset!");
  };

  const navigateToMove = (index: number) => {
    if (index >= 0 && index < history.length) {
      const historyState = history[index];
      const newGame = new Chess(historyState.fen);
      setGame(newGame);
      setCurrentMoveIndex(index);
      setMoveHistory(historyState.moveHistory);
      setCapturedPieces(historyState.capturedPieces);
      setSelectedSquare(null);
      setLegalMoves([]);
      setLastMove(null);
    }
  };

  const goBack = () => {
    if (canGoBack) {
      navigateToMove(currentMoveIndex - 1);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      navigateToMove(currentMoveIndex + 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center p-4 lg:p-8">
      <div className="flex flex-col gap-4">
        <div className="bg-card rounded-xl shadow-2xl p-4 lg:p-6 transition-all duration-300">
          <div className="grid grid-cols-8 gap-0 w-full max-w-[600px] aspect-square border-4 border-primary rounded-xl overflow-hidden shadow-xl ring-4 ring-primary/10 transition-all duration-300">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const square = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}` as Square;
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedSquare === square;
                const isLegalMove = legalMoves.includes(square);
                const isLastMoveSquare =
                  lastMove && (lastMove.from === square || lastMove.to === square);
                const isCheckSquare =
                  isCheck &&
                  piece?.type === "k" &&
                  piece.color === currentTurn;

                return (
                  <ChessSquare
                    key={square}
                    square={square}
                    piece={piece ? PIECE_SYMBOLS[`${piece.color}${piece.type}`] : null}
                    isLight={isLight}
                    isSelected={isSelected}
                    isLegalMove={isLegalMove}
                    isLastMove={isLastMoveSquare}
                    isCheck={isCheckSquare}
                    onClick={() => handleSquareClick(square)}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-4 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">
              Turn: <span className="text-primary">{currentTurn === "w" ? "White" : "Black"}</span>
            </div>
            <Button onClick={resetGame} variant="outline" className="transition-all duration-200 hover:shadow-md">
              New Game
            </Button>
          </div>
          
          {/* Move Navigation Controls */}
          <div className="flex items-center justify-center gap-8 pt-4 border-t">
            <PawnNavigationButton
              direction="back"
              onClick={goBack}
              disabled={!canGoBack}
            />
            <div className="text-sm text-muted-foreground font-medium">
              Move {currentMoveIndex} of {history.length - 1}
            </div>
            <PawnNavigationButton
              direction="forward"
              onClick={goForward}
              disabled={!canGoForward}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full lg:w-80">
        <CapturedPieces
          whiteCaptured={capturedPieces.white.map((p) => PIECE_SYMBOLS[p])}
          blackCaptured={capturedPieces.black.map((p) => PIECE_SYMBOLS[p])}
        />
        <MoveHistory moves={moveHistory} />
      </div>
    </div>
  );
};
