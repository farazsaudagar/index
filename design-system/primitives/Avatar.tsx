import { User } from "lucide-react";
import { sizes } from "../tokens";

interface AvatarProps {
  size?: "small" | "medium" | "large";
  username?: string;
  className?: string;
  showUsername?: boolean;
  iconColor?: string;
}

const sizeMap = {
  small: sizes.avatarSmall,
  medium: sizes.avatarMedium,
  large: sizes.avatarLarge,
};

export default function Avatar({
  size = "medium",
  username,
  showUsername = false,
  className = "",
  iconColor = "var(--base-light)",
}: AvatarProps) {
  const avatarSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="avatar-circle bg-accent-deep style-dynamic-size shadow-avatar"
        style={{
          '--dynamic-size': `${avatarSize}px`,
        } as React.CSSProperties}
      >
        <User 
          color={iconColor} 
          strokeWidth={2.5}
          className="icon-size-half"
        />
      </div>
      {showUsername && username && (
        <span className="text-sm text-accent-deep font-weight-medium">
          {username}
        </span>
      )}
    </div>
  );
}
