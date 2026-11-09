import type {
  BadgeColor,
  BadgePlacement,
  BadgeRadius,
  BadgeSize,
  BadgeVariant,
} from "@homonoid/react";

export interface BadgeCodeOptions {
  variant: BadgeVariant;
  color: BadgeColor;
  size: BadgeSize;
  radius: BadgeRadius;
  dot: boolean;
  showIcon: boolean;
  showCount: boolean;
  countValue: number;
  anchor: boolean;
  placement: BadgePlacement;
  label: string;
}

export function getBadgeCode(options: BadgeCodeOptions): string {
  const {
    variant,
    color,
    size,
    radius,
    dot,
    showIcon,
    showCount,
    countValue,
    anchor,
    placement,
    label,
  } = options;

  const props: string[] = [];

  if (variant !== "contained") {
    props.push(`variant="${variant}"`);
  }
  if (color !== "primary") {
    props.push(`color="${color}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "full") {
    props.push(`radius="${radius}"`);
  }

  if (anchor) {
    props.push(`placement="${placement}"`);
    if (showCount) {
      props.push(`count={${countValue}}`);
    } else if (dot) {
      props.push("dot");
    }

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    return `import { Badge, Avatar } from "@homonoid/react";

export function Example() {
  return (
    <Badge${propsStr}>
      <Avatar
        name="Alex Rivera"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        size="lg"
      />
    </Badge>
  );
}`;
  }

  if (showCount) {
    props.push(`count={${countValue}}`);
    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    return `import { Badge } from "@homonoid/react";

export function Example() {
  return (
    <Badge${propsStr} />
  );
}`;
  }

  if (dot) {
    props.push("dot");
  }

  if (showIcon) {
    props.push('leading={<Sparkles className="size-3.5" />}');
    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    return `import { Badge } from "@homonoid/react";
import { Sparkles } from "lucide-react";

export function Example() {
  return (
    <Badge${propsStr}>
      ${label}
    </Badge>
  );
}`;
  }

  const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

  return `import { Badge } from "@homonoid/react";

export function Example() {
  return (
    <Badge${propsStr}>
      ${label}
    </Badge>
  );
}`;
}

