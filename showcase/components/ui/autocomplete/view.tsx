"use client";

import {
  Autocomplete,
  Description,
} from "@homonoid/react";
import { Search } from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  AUTOCOMPLETE_SECTIONS,
  AUTOCOMPLETE_SECTIONS_LIST,
  AUTOCOMPLETE_DEFAULT_CODE_SAMPLE,
  AUTOCOMPLETE_ATOMIC_CODE_SAMPLE,
  AUTOCOMPLETE_SIZES_CODE_SAMPLE,
  AUTOCOMPLETE_ASYNC_CODE_SAMPLE,
  AUTOCOMPLETE_COMPOUND_CODE_SAMPLE,
} from "./model";

export function AutocompleteView() {
  const sections = AUTOCOMPLETE_SECTIONS;

  const defaultOptions = [
    {
      value: "react",
      label: "React",
      description: "A declarative component library for modern user interfaces.",
    },
    {
      value: "vue",
      label: "Vue",
      description: "The progressive framework for building web applications.",
    },
    {
      value: "svelte",
      label: "Svelte",
      description: "Cybernetically enhanced web applications with zero runtime.",
    },
    {
      value: "angular",
      label: "Angular",
      description: "A unified platform for scalable enterprise web development.",
    },
  ];

  const atomicOptions = [
    {
      value: "tokyo",
      label: "Tokyo",
      description: "Capital of Japan, largest metropolitan area in the world.",
    },
    {
      value: "paris",
      label: "Paris",
      description: "Capital of France, celebrated center of art and culture.",
    },
    {
      value: "london",
      label: "London",
      description: "Capital of the United Kingdom, global financial center.",
    },
    {
      value: "newyork",
      label: "New York",
      description: "Major financial and media hub in the United States.",
    },
  ];

  const sizeOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "gb", label: "United Kingdom" },
    { value: "de", label: "Germany" },
  ];

  const asyncOptions = [
    {
      value: "cache",
      label: "Cached Results",
      description: "Recently indexed items ready for instant selection.",
    },
  ];

  return (
    <Exhibit
      title="Autocomplete"
      summary="An autocomplete combines a text input with an interactive suggestions panel to filter, search, and select items rapidly."
      description="Homonoid autocompletes support both zero boilerplate atomic declarations and fully composable compound subcomponents with WAI ARIA combobox keyboard navigation."
      component="autocomplete"
      importCode='import { Autocomplete } from "@homonoid/react";'
      defaultCode={AUTOCOMPLETE_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-sm mx-auto">
          <Autocomplete placeholder="Search framework..." options={defaultOptions} />
        </div>
      }
      sections={AUTOCOMPLETE_SECTIONS_LIST}
    >
      {/* Atomic Usage Section */}
      <Exhibit.Stage section={sections.atomic} code={AUTOCOMPLETE_ATOMIC_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto">
          <Autocomplete
            leading={<Search className="size-4 text-muted" />}
            placeholder="Select destination city..."
            options={atomicOptions}
          />
        </div>
      </Exhibit.Stage>

      {/* Sizing Variants Section */}
      <Exhibit.Stage section={sections.sizes} code={AUTOCOMPLETE_SIZES_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
          <Autocomplete size="sm" placeholder="Small autocomplete..." options={sizeOptions} />
          <Autocomplete size="md" placeholder="Medium autocomplete..." options={sizeOptions} />
          <Autocomplete size="lg" placeholder="Large autocomplete..." options={sizeOptions} />
        </div>
      </Exhibit.Stage>

      {/* Async Loading Section */}
      <Exhibit.Stage section={sections.async} code={AUTOCOMPLETE_ASYNC_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto">
          <Autocomplete
            loading
            placeholder="Searching remote database..."
            options={asyncOptions}
          />
        </div>
      </Exhibit.Stage>

      {/* Compound Composition Section */}
      <Exhibit.Stage section={sections.interactive} code={AUTOCOMPLETE_COMPOUND_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto">
          <Autocomplete defaultValue="react">
            <Autocomplete.Input placeholder="Select framework..." />
            <Autocomplete.Content>
              <Autocomplete.List>
                <Autocomplete.Group heading="Popular">
                  <Autocomplete.Item value="react">React</Autocomplete.Item>
                  <Autocomplete.Item value="vue">Vue</Autocomplete.Item>
                </Autocomplete.Group>
                <Autocomplete.Group heading="Emerging">
                  <Autocomplete.Item value="svelte">Svelte</Autocomplete.Item>
                  <Autocomplete.Item value="solid">Solid</Autocomplete.Item>
                </Autocomplete.Group>
              </Autocomplete.List>
              <Autocomplete.Empty>No frameworks found.</Autocomplete.Empty>
            </Autocomplete.Content>
          </Autocomplete>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Suggestions surfaces open using micro scale and opacity transitions that prevent abrupt layout jumps across the viewport.
        </Description>
        <Description>
          Native input focus remains completely uninterrupted throughout query typing, menu navigation, and item selection.
        </Description>
        <Description>
          Hover highlights and active keyboard navigation coordinate through roving active descendant references without moving DOM focus.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          The text field conforms to the WAI ARIA Combobox design pattern declaring combobox roles and aria autocomplete attributes.
        </Description>
        <Description>
          Arrow Down and Arrow Up keys traverse available options sequentially while keeping keyboard focus anchored within the input field.
        </Description>
        <Description>
          Selected items declare explicit aria selected attributes paired with high contrast foreground styling for clear status feedback.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          All floating panels, item rows, and border outlines consume semantic surface and border tokens from the Homonoid design system.
        </Description>
        <Description>
          Input heights, padding scales, and font sizes strictly follow standard control sizing scales for small, medium, and large dimensions.
        </Description>
        <Description>
          Focus rings and active descendant states apply high contrast focus styling matching platform visual standards.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          The root Autocomplete component exposes Input, Content, List, Item, Group, Empty, and Loading primitives through dot notation.
        </Description>
        <Description>
          Developers can configure custom filter predicates, asynchronous loading indicators, and clearable triggers effortlessly.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

