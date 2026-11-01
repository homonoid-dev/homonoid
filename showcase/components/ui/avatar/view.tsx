"use client";

import { Avatar, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  AVATAR_SECTIONS,
  AVATAR_SECTIONS_LIST,
  AVATAR_DEFAULT_CODE_SAMPLE,
  AVATAR_VARIANTS_CODE_SAMPLE,
  AVATAR_SIZES_CODE_SAMPLE,
  AVATAR_COLORS_CODE_SAMPLE,
  AVATAR_PRESENCE_CODE_SAMPLE,
  AVATAR_GROUPS_CODE_SAMPLE,
} from "./model";

export function AvatarView() {
  const sections = AVATAR_SECTIONS;
  const variants = ["contained", "outlined", "plain"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const colors = ["primary", "subtle", "surface", "destructive"] as const;
  const statuses = ["online", "away", "busy", "offline"] as const;

  return (
    <Exhibit
      title="Avatar"
      summary="An avatar visually represents an individual user, group, entity, or automated agent across an interface."
      description="Avatars support image sources, calculated text initials, generic silhouette fallbacks, status presence indicators, and grouped stacks."
      component="avatar"
      importCode='import { Avatar } from "@homonoid/react";'
      defaultCode={AVATAR_DEFAULT_CODE_SAMPLE}
      defaultStage={
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
      }
      sections={AVATAR_SECTIONS_LIST}
    >
      {/* Structural Variants Section */}
      <Exhibit.Stage section={sections.variants} code={AVATAR_VARIANTS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Dimensional Scales Section */}
      <Exhibit.Stage section={sections.sizes} code={AVATAR_SIZES_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Semantic Color Palettes Section */}
      <Exhibit.Stage section={sections.colors} code={AVATAR_COLORS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Presence Status Section */}
      <Exhibit.Stage section={sections.presence} code={AVATAR_PRESENCE_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Avatar Groups Section */}
      <Exhibit.Stage section={sections.groups} code={AVATAR_GROUPS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Initial text abbreviations render during pending image resolution without triggering horizontal layout shifting across sibling elements.
        </Description>
        <Description>
          Anchored status indicators maintain constant relative offsets across component dimension shifts, preserving stable registration against host perimeters.
        </Description>
        <Description>
          Image source transitions crossfade opacity smoothly upon completed network loads, maintaining object continuity.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Avatars carry descriptive accessible labels communicating user identity or state descriptions to assistive technologies.
        </Description>
        <Description>
          Presence status markers pair distinct color fills with contextual descriptions to guarantee comprehension for users with color vision differences.
        </Description>
        <Description>
          Decorative fallback icons apply aria hidden flags to prevent redundant announcements during keyboard traversal.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Dimensional scales inherit control height tokens calibrated directly across small thirty two pixel, medium forty pixel, and large forty eight pixel frames.
        </Description>
        <Description>
          Surfaces and hairline borders consume standardized Chroma primary, subtle, surface, and destructive color tokens across light and dark modes.
        </Description>
        <Description>
          Geometry tokens provide fluid options across continuous circular full radii and standard rounded corner curvature.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can declare atomic avatars with automatic fallback resolution or compose granular layouts using compound dot notation primitives.
        </Description>
        <Description>
          The component exposes Avatar.Image, Avatar.Fallback, Avatar.Indicator, and Avatar.Group for complete architectural composition.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

