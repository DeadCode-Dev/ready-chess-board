import { 
  FaChessKing, 
  FaChessQueen, 
  FaChessRook, 
  FaChessBishop, 
  FaChessKnight, 
  FaChessPawn 
} from "react-icons/fa";

interface ChessPieceProps {
  piece: string;
  className?: string;
}

export const ChessPiece = ({ piece, className = "" }: ChessPieceProps) => {
  const color = piece[0] === 'w' ? 'text-white' : 'text-black';
  const type = piece[1];
  
  const baseClassName = `${color} ${className}`;
  
  switch (type) {
    case 'k':
      return <FaChessKing className={baseClassName} />;
    case 'q':
      return <FaChessQueen className={baseClassName} />;
    case 'r':
      return <FaChessRook className={baseClassName} />;
    case 'b':
      return <FaChessBishop className={baseClassName} />;
    case 'n':
      return <FaChessKnight className={baseClassName} />;
    case 'p':
      return <FaChessPawn className={baseClassName} />;
    default:
      return null;
  }
};
