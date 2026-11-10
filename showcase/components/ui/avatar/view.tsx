"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  cond,
  Select,
  type AvatarColor,
  type AvatarRadius,
  type AvatarSize,
  type AvatarStatus,
  type AvatarVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { AVATAR_USERS, getAvatarCode } from "./model";

export function AvatarView() {
  const [variant, setVariant] = useState<AvatarVariant>("contained");
  const [color, setColor] = useState<AvatarColor>("surface");
  const [size, setSize] = useState<AvatarSize>("md");
  const [radius, setRadius] = useState<AvatarRadius>("full");
  const [status, setStatus] = useState<AvatarStatus>("online");
  const [showImage, setShowImage] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [group, setGroup] = useState(false);

  const code = useMemo(
    () =>
      getAvatarCode({
        variant,
        color,
        size,
        radius,
        showImage,
        showStatus,
        status,
        group,
      }),
    [variant, color, size, radius, showImage, showStatus, status, group]
  );

  return (
    <Studio
      title="Avatar"
      description="Visual representation surfaces for identity profiles, brand marks, and entity placeholders. Delivers continuous border radii, initials fallbacks, status indicator badges, and overlapping stacked groups."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["contained", "outlined", "plain"],
          onChange: setVariant,
        },
        color: {
          value: color,
          options: ["primary", "subtle", "surface", "destructive"],
          onChange: setColor,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        radius: {
          value: radius,
          options: ["full", "lg", "md", "sm", "none"],
          onChange: setRadius,
        },
        switches: [
          {
            id: "image",
            label: "Image",
            description: "Display photograph profile",
            checked: showImage,
            onChange: setShowImage,
          },
          {
            id: "status",
            label: "Status",
            description: "Show presence indicator",
            checked: showStatus,
            onChange: setShowStatus,
          },
          {
            id: "group",
            label: "Group",
            description: "Stack avatars with max limit",
            checked: group,
            onChange: setGroup,
          },
        ],
        children: cond(
          showStatus,
          <Select
            value={status}
            onValueChange={(val) => setStatus(val as AvatarStatus)}
            size="sm"
            placeholder="Presence status"
            options={[
              { value: "online", label: "Online" },
              { value: "away", label: "Away" },
              { value: "busy", label: "Busy" },
              { value: "offline", label: "Offline" },
            ]}
          />,
          undefined
        ),
      }}
    >
      {cond(
        group,
        <Avatar.Group
          max={3}
          size={size}
          radius={radius}
        >
          {AVATAR_USERS.map((user) => (
            <Avatar
              key={user.name}
              name={user.name}
              src={cond(showImage, user.src, undefined)}
              variant={variant}
              color={color}
              size={size}
              radius={radius}
              status={cond(showStatus, user.status, undefined)}
            />
          ))}
        </Avatar.Group>,
        <Avatar
          name={AVATAR_USERS[0].name}
          src={cond(showImage, AVATAR_USERS[0].src, undefined)}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          status={cond(showStatus, status, undefined)}
        />
      )}
    </Studio>
  );
}
