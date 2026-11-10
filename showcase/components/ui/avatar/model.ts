import type { AvatarColor, AvatarRadius, AvatarSize, AvatarStatus, AvatarVariant } from "@homonoid/react";

export interface AvatarDemoUser {
  name: string;
  src: string;
  status: AvatarStatus;
}

export const AVATAR_USERS: AvatarDemoUser[] = [
  {
    name: "Alex Rivera",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "online",
  },
  {
    name: "Sarah Chen",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "away",
  },
  {
    name: "Marcus Vance",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "busy",
  },
  {
    name: "Elena Rostova",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    status: "offline",
  },
];

export interface AvatarCodeOptions {
  variant: AvatarVariant;
  color: AvatarColor;
  size: AvatarSize;
  radius: AvatarRadius;
  showImage: boolean;
  showStatus: boolean;
  status: AvatarStatus;
  group: boolean;
}

export function getAvatarCode(options: AvatarCodeOptions): string {
  const {
    variant,
    color,
    size,
    radius,
    showImage,
    showStatus,
    status,
    group,
  } = options;

  const buildProps = (user: AvatarDemoUser, userStatus?: AvatarStatus) => {
    const props: string[] = [`name="${user.name}"`];
    if (showImage) {
      props.push(`src="${user.src}"`);
    }
    if (variant !== "contained") {
      props.push(`variant="${variant}"`);
    }
    if (color !== "surface") {
      props.push(`color="${color}"`);
    }
    if (size !== "md") {
      props.push(`size="${size}"`);
    }
    if (radius !== "full") {
      props.push(`radius="${radius}"`);
    }
    if (showStatus) {
      props.push(`status="${userStatus ?? status}"`);
    }
    return props;
  };

  if (group) {
    const itemsCode = AVATAR_USERS.map((user) => {
      const props = buildProps(user, user.status);
      const propsStr = props.join(" ");
      return `      <Avatar ${propsStr} />`;
    }).join("\n");

    const groupProps: string[] = ["max={3}"];
    if (size !== "md") {
      groupProps.push(`size="${size}"`);
    }
    if (radius !== "full") {
      groupProps.push(`radius="${radius}"`);
    }

    return `import { Avatar } from "@homonoid/react";

export function Example() {
  return (
    <Avatar.Group ${groupProps.join(" ")}>
${itemsCode}
    </Avatar.Group>
  );
}`;
  }

  const singleProps = buildProps(AVATAR_USERS[0], status);
  const formattedProps = singleProps.map((p) => `      ${p}`).join("\n");

  return `import { Avatar } from "@homonoid/react";

export function Example() {
  return (
    <Avatar
${formattedProps}
    />
  );
}`;
}

