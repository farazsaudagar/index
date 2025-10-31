import { ReactNode } from "react";

interface ShelfPlankProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  shadowSize?: "default" | "large";
}

export default function ShelfPlank({
  children,
  className = "",
  hoverable = true,
  shadowSize = "default",
}: ShelfPlankProps) {
  const shadowClass = shadowSize === "default" 
    ? "shadow-shelf-plank-default" 
    : "shadow-shelf-plank-large";

  return (
    <>
      <div className="shelf-wall-shadow shadow-wall shelf-wall-shadow-bg" />

      <div
        className={`
          shelf-plank-base bg-shelf-plank border-shelf-plank
          ${hoverable ? "shelf-plank-hoverable" : ""}
          ${shadowClass}
          ${className}
        `}
      >
        <div className="shelf-top-bevel bevel-gradient" />
        {children}
      </div>
    </>
  );
}
