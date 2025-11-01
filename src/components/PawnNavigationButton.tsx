import { cn } from "@/lib/utils";

interface PawnNavigationButtonProps {
  direction: "back" | "forward";
  onClick: () => void;
  disabled: boolean;
}

export const PawnNavigationButton = ({ direction, onClick, disabled }: PawnNavigationButtonProps) => {
  const isBack = direction === "back";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-12 h-12 transition-all duration-200 group",
        disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-110 cursor-pointer"
      )}
      aria-label={isBack ? "Previous move" : "Next move"}
    >
      {/* Pawn SVG */}
      <svg
        viewBox="0 0 45 45"
        className={cn(
          "w-full h-full transition-all duration-200",
          disabled ? "fill-muted-foreground" : "fill-primary group-hover:fill-accent"
        )}
      >
        {/* Pawn shape based on chess piece design */}
        <g>
          {/* Base */}
          <path d="M 22.5,9 C 19.5,9 16.5,10.5 14.5,13.5 C 12.5,16.5 12.5,20.5 14.5,23.5 C 16.5,26.5 19.5,28 22.5,28 C 25.5,28 28.5,26.5 30.5,23.5 C 32.5,20.5 32.5,16.5 30.5,13.5 C 28.5,10.5 25.5,9 22.5,9 z" />
          {/* Body */}
          <path d="M 11.5,37 L 11.5,35.5 L 13.5,33 C 13.5,31.5 16,29.5 16,29.5 L 17,28.5 L 15.5,26 L 18,24.5 C 18,24.5 19.28,25 22.5,25 C 25.72,25 27,24.5 27,24.5 L 29.5,26 L 28,28.5 L 29,29.5 C 29,29.5 31.5,31.5 31.5,33 L 33.5,35.5 L 33.5,37 L 11.5,37 z" />
          {/* Bottom base */}
          <path d="M 11.5,37 C 11.5,38.5 16,40.5 22.5,40.5 C 29,40.5 33.5,38.5 33.5,37 L 33.5,37 L 11.5,37 z" />
        </g>
      </svg>
      {/* Direction arrow overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        disabled ? "opacity-0" : "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      )}>
        <div className={cn(
          "text-background font-bold text-xl",
          isBack ? "ml-0.5" : "mr-0.5"
        )}>
          {isBack ? "←" : "→"}
        </div>
      </div>
    </button>
  );
};
