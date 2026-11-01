import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  Paintbrush,
  Activity,
  Users,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface AvatarSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const AVATAR_SECTIONS: Record<string, AvatarSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: Paintbrush,
  },
  presence: {
    id: "presence-status",
    label: "Presence Status",
    icon: Activity,
  },
  groups: {
    id: "avatar-groups",
    label: "Avatar Groups",
    icon: Users,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const AVATAR_SECTIONS_LIST: AvatarSectionItem[] =
  Object.values(AVATAR_SECTIONS);

export const AVATAR_DEFAULT_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        name="Elena Rostova"
        status="online"
      />
      <Avatar name="Marcus Vance" color="primary" />
      <Avatar name="Sarah Connor" color="surface" variant="outlined" />
      <Avatar color="subtle" status="away" />
    </div>
  );
}`;

export const AVATAR_VARIANTS_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  const variants = ["contained", "outlined", "plain"] as const;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {variants.map((variant) => (
          <Avatar
            key={variant}
            variant={variant}
            color="primary"
            name="Alex Morgan"
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {variants.map((variant) => (
          <Avatar
            key={variant}
            variant={variant}
            color="surface"
            name="Jordan Lee"
          />
        ))}
      </div>
    </div>
  );
}`;

export const AVATAR_SIZES_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {sizes.map((size) => (
        <Avatar
          key={size}
          size={size}
          name="Samira Khan"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
          status="online"
        />
      ))}
    </div>
  );
}`;

export const AVATAR_COLORS_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  const colors = ["primary", "subtle", "surface", "destructive"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {colors.map((color) => (
        <Avatar
          key={color}
          color={color}
          variant="contained"
          name={color.charAt(0).toUpperCase() + color.slice(1)}
        />
      ))}
    </div>
  );
}`;

export const AVATAR_PRESENCE_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  const statuses = ["online", "away", "busy", "offline"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {statuses.map((status) => (
        <Avatar
          key={status}
          name="Devon Lane"
          status={status}
          color="surface"
          variant="outlined"
        />
      ))}
    </div>
  );
}`;

export const AVATAR_GROUPS_CODE_SAMPLE = `import { Avatar } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar.Group max={3} size="md">
        <Avatar
          name="Alex Rivera"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        />
        <Avatar
          name="Beatriz Silva"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        />
        <Avatar
          name="Chen Wei"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
        />
        <Avatar name="Devon Lane" />
        <Avatar name="Emma Watson" />
      </Avatar.Group>

      <Avatar.Group size="sm">
        <Avatar name="Kavita Patel" color="primary" />
        <Avatar name="Liam Thorne" color="subtle" />
        <Avatar name="Maya Lin" color="surface" />
      </Avatar.Group>
    </div>
  );
}`;

