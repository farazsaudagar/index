import { ReactNode, ElementType } from "react";
import { typography } from "../tokens";

interface TypographyProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
  className?: string;
}

const variantStyles = {
  h1: {
    fontSize: typography.fontSize["3xl"],
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.normal,
  },
  h2: {
    fontSize: typography.fontSize["2xl"],
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.normal,
  },
  h3: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.normal,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium,
  },
};

const ComponentMap: Record<"h1" | "h2" | "h3" | "body" | "caption", ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "span",
};

export default function Typography({
  children,
  variant = "body",
  className = "",
}: TypographyProps) {
  const Component = ComponentMap[variant];
  const variantStyle = variantStyles[variant];

  return (
    <Component
      className={`text-accent-deep font-primary ${className}`}
      style={variantStyle}
    >
      {children}
    </Component>
  );
}
