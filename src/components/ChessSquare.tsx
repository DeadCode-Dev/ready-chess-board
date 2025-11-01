import { cn } from "@/lib/utils";
import { ChessPiece } from "./ChessPiece";

interface ChessSquareProps {
  square: string;
  piece: string | null;
  isLight: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isLastMove: boolean;
  isCheck: boolean;
  onClick: () => void;
}

export const ChessSquare = ({
  piece,
  isLight,
  isSelected,
  isLegalMove,
  isLastMove,
  isCheck,
  onClick,
}: ChessSquareProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-square flex items-center justify-center transition-all duration-200 hover:brightness-95",
        isLight ? "bg-chess-light" : "bg-chess-dark",
        isSelected && "ring-4 ring-chess-selected ring-inset brightness-110",
        isLastMove && "bg-chess-highlight",
        isCheck && "bg-chess-check animate-pulse"
      )}
    >
      {piece && (
        <div
          className={cn(
            "select-none cursor-pointer transition-transform hover:scale-110 text-5xl lg:text-6xl",
            isSelected && "scale-110"
          )}
          style={{ 
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ChessPiece piece={piece} />
        </div>
      )}
      {isLegalMove && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            piece ? "opacity-0 hover:opacity-100" : ""
          )}
        >
          <div
            className={cn(
              "rounded-full bg-chess-legal-move transition-opacity",
              piece ? "w-full h-full opacity-20" : "w-1/3 h-1/3 opacity-40"
            )}
          />
        </div>
      )}
    </button>
  );
};
