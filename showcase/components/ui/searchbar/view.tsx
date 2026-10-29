"use client";

import { useRef, useEffect } from "react";
import { Searchbar, Kbd, Description } from "@homonoid/react";
import { Search } from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  SEARCHBAR_SECTIONS,
  SEARCHBAR_SECTIONS_LIST,
  SEARCHBAR_DEFAULT_CODE_SAMPLE,
  SEARCHBAR_VARIANTS_CODE_SAMPLE,
  SEARCHBAR_LOADING_CODE_SAMPLE,
  SEARCHBAR_SHORTCUT_CODE_SAMPLE,
  SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE,
  SEARCHBAR_FLOATING_LABEL_CODE_SAMPLE,
} from "./model";

function ShortcutExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <Searchbar
        ref={inputRef}
        aria-keyshortcuts="Meta+K Control+K"
        leading={<Search className="size-4 text-muted" aria-hidden="true" />}
        trailing={<Kbd keyValue="command" content="K" />}
        placeholder="Quick find..."
      />
    </div>
  );
}

export function SearchbarView() {
  const sections = SEARCHBAR_SECTIONS;

  const variants = [
    { variant: "outlined", placeholder: "Outlined searchbar" },
    { variant: "contained", placeholder: "Contained searchbar" },
    { variant: "plain", placeholder: "Plain searchbar" },
  ] as const;

  return (
    <Exhibit
      title="Searchbar"
      summary="A searchbar allows users to enter, preview, and submit search queries across collections of data and application views."
      description="Searchbars combine immediate text entry with contextual search actions including leading query icons, asynchronous loading states, and trailing keyboard shortcut keys."
      component="searchbar"
      importCode='import { Searchbar } from "@homonoid/react";'
      defaultCode={SEARCHBAR_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-sm">
          <Searchbar
            leading={<Search className="size-4 text-muted" />}
            placeholder="Search documentation..."
          />
        </div>
      }
      sections={SEARCHBAR_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={SEARCHBAR_VARIANTS_CODE_SAMPLE}>
        <div className="w-full max-w-sm flex flex-col gap-3">
          {variants.map((item) => (
            <Searchbar
              key={item.variant}
              leading={<Search className="size-4 text-muted" />}
              variant={item.variant}
              placeholder={item.placeholder}
            />
          ))}
        </div>
      </Exhibit.Stage>

      {/* Loading Section */}
      <Exhibit.Stage section={sections.loading} code={SEARCHBAR_LOADING_CODE_SAMPLE}>
        <div className="w-full max-w-sm">
          <Searchbar
            leading={<Search className="size-4 text-muted" />}
            loading
            defaultValue="Homonoid design tokens"
            placeholder="Querying components..."
          />
        </div>
      </Exhibit.Stage>

      {/* Shortcut Section */}
      <Exhibit.Stage section={sections.shortcut} code={SEARCHBAR_SHORTCUT_CODE_SAMPLE}>
        <ShortcutExample />
      </Exhibit.Stage>

      {/* Label & Description Section */}
      <Exhibit.Stage section={sections.labelAndDescription} code={SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE}>
        <div className="w-full max-w-sm flex flex-col gap-surface-gap">
          <Searchbar
            leading={<Search className="size-4 text-muted" />}
            label="Repository Search"
            description="Query public and private repositories across your organization."
            placeholder="Search repositories..."
          />
        </div>
      </Exhibit.Stage>

      {/* Floating Label Section */}
      <Exhibit.Stage section={sections.floatingLabel} code={SEARCHBAR_FLOATING_LABEL_CODE_SAMPLE}>
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Searchbar
            floating
            label="Search library..."
            leading={<Search className="size-4 text-muted" />}
          />
          <Searchbar
            floating
            label="Quick command"
            leading={<Search className="size-4 text-muted" />}
            trailing={<Kbd keyValue="command" content="K" />}
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Searchbars preserve dimensional stability across query state transitions. Focus rings expand outward smoothly without displacing adjacent controls or altering internal container heights.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Searchbars provide native searchbox semantics through explicit role searchbox and native type search attributes.
        </Description>

        <Description>
          During asynchronous query operations, the container communicates activity to assistive technology through dynamic aria busy states.
        </Description>

        <Description>
          Native keyboard navigation allows quick focus management and intuitive Escape key clearing behaviors.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Searchbars consume spatial control heights and semantic surface tokens directly from the design system.
        </Description>

        <Description>
          Container padding, typography sizes, and border treatments scale systematically across small, medium, and large tiers.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Searchbars integrate cleanly within navigation headers, hero discovery bars, modal command palettes, and table toolbars.
        </Description>

        <Description>
          Curvature options from sharp corners to rounded full pills harmonize with surrounding card surfaces and button shapes.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
