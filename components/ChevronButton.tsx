import { ChevronLeft, ChevronRight } from "lucide-react";
import { sizes } from "@/design-system/tokens";

interface ChevronButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}

export default function ChevronButton({ 
  direction, 
  onClick, 
  disabled = false, 
  ariaLabel 
}: ChevronButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        chevron-button btn-icon-variant-overlay text-accent-deep style-dynamic-size
        ${disabled ? 'chevron-button-disabled' : 'chevron-button-enabled'}
        ${direction === 'left' ? 'chevron-button-left' : 'chevron-button-right'}
      `}
      style={{ '--dynamic-size': `${sizes.buttonMedium}px` } as React.CSSProperties}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}
