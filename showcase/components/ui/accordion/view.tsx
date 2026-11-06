"use client";

import { Accordion } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";

export function AccordionView() {
  return (
    <Studio
      title="Accordion"
      description="Vertically stacked disclosure surfaces engineered with continuous motion physics and dimensional height stability. Delivers intuitive keyboard navigation and reliable assistive technology semantics across all expansion states."
    >
      <Accordion defaultValue="item-1" className="w-full max-w-md">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>What is Homonoid?</Accordion.Trigger>
          <Accordion.Content>
            A tactile design system built with continuous aesthetics and object continuity.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>How does motion work?</Accordion.Trigger>
          <Accordion.Content>
            Interactive surfaces respond with continuous easing and dynamic scale transitions.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content>
            Built with full keyboard navigation and comprehensive assistive technology support.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Studio>
  );
}

