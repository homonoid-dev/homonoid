"use client";

import { Empty, Button, Description } from "@homonoid/react";
import {
  FolderPlus,
  Search,
  Inbox,
  FileQuestion,
  BookmarkPlus,
  Bell,
  ShieldCheck,
  Database,
} from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  EMPTY_SECTIONS,
  EMPTY_SECTIONS_LIST,
  EMPTY_DEFAULT_CODE_SAMPLE,
  EMPTY_VARIANTS_CODE_SAMPLE,
  EMPTY_SIZES_CODE_SAMPLE,
  EMPTY_COMPOUND_CODE_SAMPLE,
  EMPTY_MEDIA_CODE_SAMPLE,
} from "./model";

export function EmptyView() {
  const sections = EMPTY_SECTIONS;
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <Exhibit
      title="Empty"
      summary="An empty state communicates the absence of records or search matches and guides users toward productive next actions."
      description="Empty states convert blank canvas moments into intuitive guidance through expressive media containers, concise titles, supportive descriptions, and primary actions."
      component="empty"
      importCode='import { Empty } from "@homonoid/react";'
      defaultCode={EMPTY_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Empty
          icon={<FolderPlus />}
          title="No projects found"
          description="Get started by creating your first workspace project."
          action={<Button variant="contained">Create Project</Button>}
        />
      }
      sections={EMPTY_SECTIONS_LIST}
    >
      {/* Structural Variants Section */}
      <Exhibit.Stage section={sections.variants} code={EMPTY_VARIANTS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Dimensional Scales Section */}
      <Exhibit.Stage section={sections.sizes} code={EMPTY_SIZES_CODE_SAMPLE}>
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
          {sizes.map((size) => (
            <Empty
              key={size}
              size={size}
              variant="contained"
              icon={<FolderPlus />}
              title={`Empty state ${size.toUpperCase()}`}
              description="Dimensions adapt across small, medium, and large tiers."
            />
          ))}
        </div>
      </Exhibit.Stage>

      {/* Compound Composition Section */}
      <Exhibit.Stage section={sections.compound} code={EMPTY_COMPOUND_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Media Treatments Section */}
      <Exhibit.Stage section={sections.mediaVariants} code={EMPTY_MEDIA_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Transitions preserve spatial identity by maintaining constant relative offsets between media graphics, text stacks, and actionable controls.
        </Description>
        <Description>
          Dynamic state switches between populated content and empty placeholder states resolve fluidly without sudden layout jumps.
        </Description>
        <Description>
          Containers inherit standardized surface padding tokens, ensuring dimensional stability across varied screen resolutions.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Empty components declare status roles with polite live region announcements when content clears dynamically upon query changes.
        </Description>
        <Description>
          Title headings provide semantic landmark structures allowing assistive technology users to navigate directly to the state explanation.
        </Description>
        <Description>
          Media graphics and icons apply decorative presentation flags, preventing repetitive announcements during keyboard traversal.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Dimensional scales inherit surface padding and control tokens calibrated across compact, standard, and expansive views.
        </Description>
        <Description>
          Surfaces and borders consume standardized Chroma primary, subtle, surface, and muted color tokens across light and dark modes.
        </Description>
        <Description>
          Outer geometry adapts through continuous rounded tokens establishing harmonic radius continuity across parent cards.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can declare atomic placeholders with title and action properties or compose granular presentations using compound dot notation.
        </Description>
        <Description>
          The component exposes Empty.Media, Empty.Header, Empty.Title, Empty.Description, and Empty.Actions for complete layout flexibility.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
