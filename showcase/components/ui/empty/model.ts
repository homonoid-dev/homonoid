import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  Component,
  Inbox,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface EmptySectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const EMPTY_SECTIONS: Record<string, EmptySectionItem> = {
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
  compound: {
    id: "compound-composition",
    label: "Compound Composition",
    icon: Component,
  },
  mediaVariants: {
    id: "media-treatments",
    label: "Media Treatments",
    icon: Inbox,
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

export const EMPTY_SECTIONS_LIST: EmptySectionItem[] =
  Object.values(EMPTY_SECTIONS);

export const EMPTY_DEFAULT_CODE_SAMPLE = `import { Empty, Button } from "@homonoid/react";
import { FolderPlus } from "lucide-react";

export function Example() {
  return (
    <Empty
      icon={<FolderPlus />}
      title="No projects found"
      description="Get started by creating your first workspace project."
      action={<Button variant="contained">Create Project</Button>}
    />
  );
}`;

export const EMPTY_VARIANTS_CODE_SAMPLE = `import { Empty, Button } from "@homonoid/react";
import { Search, Inbox, FileQuestion } from "lucide-react";

export function Example() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      <Empty
        variant="plain"
        icon={<Search />}
        title="No search results"
        description="Try adjusting your filter terms or query keywords."
      />
      <Empty
        variant="outlined"
        icon={<FileQuestion />}
        title="No documents uploaded"
        description="Upload documents to share them across team members."
        action={<Button variant="outlined" color="surface">Upload Files</Button>}
      />
      <Empty
        variant="contained"
        icon={<Inbox />}
        title="Inbox zero"
        description="All notification items have been reviewed."
      />
    </div>
  );
}`;

export const EMPTY_SIZES_CODE_SAMPLE = `import { Empty } from "@homonoid/react";
import { FolderPlus } from "lucide-react";

export function Example() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      {sizes.map((size) => (
        <Empty
          key={size}
          size={size}
          variant="contained"
          icon={<FolderPlus />}
          title={\`Empty state \${size.toUpperCase()}\`}
          description="Dimensions adapt across small, medium, and large tiers."
        />
      ))}
    </div>
  );
}`;

export const EMPTY_COMPOUND_CODE_SAMPLE = `import { Empty, Button } from "@homonoid/react";
import { BookmarkPlus } from "lucide-react";

export function Example() {
  return (
    <Empty variant="outlined" className="max-w-md mx-auto">
      <Empty.Media variant="subtle">
        <BookmarkPlus />
      </Empty.Media>
      <Empty.Header>
        <Empty.Title>No bookmarks saved</Empty.Title>
        <Empty.Description>
          Pin frequently referenced collections for instant discovery.
        </Empty.Description>
      </Empty.Header>
      <Empty.Actions>
        <Button variant="contained">Browse Collections</Button>
        <Button variant="plain" color="surface">Learn More</Button>
      </Empty.Actions>
    </Empty>
  );
}`;

export const EMPTY_MEDIA_CODE_SAMPLE = `import { Empty } from "@homonoid/react";
import { Bell, ShieldCheck, Database } from "lucide-react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Empty.Media variant="default">
          <Bell />
        </Empty.Media>
        <span className="text-xs text-muted">Default Media</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Empty.Media variant="subtle">
          <ShieldCheck />
        </Empty.Media>
        <span className="text-xs text-muted">Subtle Media</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Empty.Media variant="surface">
          <Database />
        </Empty.Media>
        <span className="text-xs text-muted">Surface Media</span>
      </div>
    </div>
  );
}`;

