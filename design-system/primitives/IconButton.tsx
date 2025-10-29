import { LucideIcon } from "lucide-react";
import { sizes } from "../tokens";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "default" | "ghost" | "overlay";
  position?: "absolute" | "relative" | "static";
  positionValue?: string;
  className?: string;
  disabled?: boolean;
  "aria-label": string;
  iconSize?: number;
}

const sizeMap = {
  small: sizes.buttonSmall,
  medium: sizes.buttonMedium,
  large: sizes.buttonLarge,
};

const variantClassMap = {
  default: "btn-icon-variant-default",
  overlay: "btn-icon-variant-overlay",
  ghost: "btn-icon-variant-ghost",
};

const sizeVarMap = {
  small: "vars-button-small",
  medium: "vars-button-medium",
  large: "vars-button-large",
};

export default function IconButton({
  icon: Icon,
  onClick,
  size = "medium",
  variant = "default",
  position = "relative",
  positionValue,
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
  iconSize,
}: IconButtonProps) {
  const buttonSize = sizeMap[size];
  const positionClass = position === "absolute" ? "absolute" : position;
  const variantClass = variantClassMap[variant];
  const sizeVarClass = sizeVarMap[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        btn-icon ${variantClass}
        ${disabled ? "btn-icon-disabled" : "btn-icon-enabled"}
        ${positionClass}
        style-dynamic-size
        ${sizeVarClass}
        ${position === "absolute" && positionValue === "position-right-calc" ? 'position-right-calc' : ''}
        ${position === "absolute" && positionValue && positionValue !== "position-right-calc" ? 'style-dynamic-position-right' : ''}
        ${className}
      `}
      style={{
        '--dynamic-size': `${buttonSize}px`,
        ...(position === "absolute" && positionValue && positionValue !== "position-right-calc"
          ? (positionValue.includes('calc') || positionValue.includes('px'))
            ? { '--dynamic-position-right': positionValue.includes('px') ? positionValue : undefined, right: positionValue.includes('calc') ? positionValue : undefined }
            : {}
          : {}),
      } as React.CSSProperties}
    >
      <Icon 
        size={iconSize || undefined}
        strokeWidth={3}
        className={!iconSize ? 'icon-size-auto-button' : ''}
        style={iconSize ? { width: `${iconSize}px`, height: `${iconSize}px` } : undefined}
      />
    </button>
  );
}
