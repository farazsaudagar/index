import { ChevronLeft, ChevronRight } from "lucide-react";

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
        absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full 
        flex items-center justify-center
        hover:opacity-80
        focus:outline-none focus:ring-2 focus:ring-sand/40 focus:ring-offset-2
        transition-all duration-200
        ${disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
        ${direction === 'left' ? '-left-14' : '-right-14'}
      `}
      style={{
        background: 'color-mix(in srgb, var(--base-light) 85%, transparent)',
        border: '1px solid color-mix(in srgb, var(--neutral-sand) 50%, transparent)',
        boxShadow: '0 2px 8px color-mix(in srgb, var(--accent-deep) 10%, transparent)',
        backdropFilter: 'blur(4px)',
        color: 'var(--accent-deep)'
      }}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}
