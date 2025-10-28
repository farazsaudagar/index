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
        absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full 
        bg-paper/80 border border-sand/40 shadow-[0_4px_12px_rgba(33,53,85,0.08)]
        flex items-center justify-center
        hover:bg-paper hover:border-sand/60 hover:shadow-[0_6px_16px_rgba(33,53,85,0.12)]
        focus:outline-none focus:ring-2 focus:ring-sand/40 focus:ring-offset-2 focus:ring-offset-shelf
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${direction === 'left' ? '-left-5' : '-right-5'}
      `}
    >
      <svg 
        className="w-5 h-5 text-ink" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === "left" ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}
