"use client";

import { Input, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import { InteractiveStates } from "@/components/ui/interactive-states";
import { Search, Mail, Eye } from "lucide-react";
import {
  INPUT_SECTIONS,
  INPUT_SECTIONS_LIST,
  INPUT_INTERACTIVE_STATES,
  INPUT_DEFAULT_CODE_SAMPLE,
  INPUT_VARIANTS_CODE_SAMPLE,
  INPUT_ADORNMENTS_CODE_SAMPLE,
  INPUT_LABEL_HELPER_CODE_SAMPLE,
  INPUT_FLOATING_LABEL_CODE_SAMPLE,
  INPUT_VALIDATION_CODE_SAMPLE,
  INPUT_DISABLED_CODE_SAMPLE,
} from "./model";

export function InputView() {
  const sections = INPUT_SECTIONS;

  return (
    <Exhibit
      title="Input"
      summary="An input allows users to enter, edit, and submit text data through direct keyboard entry."
      description="Inputs are foundational interface controls for capturing structured and unstructured user data while maintaining dimensional stability and visual continuity across interactive states."
      component="input"
      importCode='import { Input } from "@homonoid/react";'
      defaultCode={INPUT_DEFAULT_CODE_SAMPLE}
      defaultStage={<Input placeholder="Enter text..." className="max-w-sm" />}
      sections={INPUT_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={INPUT_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input variant="outlined" placeholder="Outlined input" />
          <Input variant="contained" placeholder="Contained input" />
          <Input variant="plain" placeholder="Plain input" />
        </div>
      </Exhibit.Stage>

      {/* Adornments Section */}
      <Exhibit.Stage section={sections.adornments} code={INPUT_ADORNMENTS_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input
            leading={<Search className="size-4 text-muted" />}
            placeholder="Search components..."
          />
          <Input
            leading={<Mail className="size-4 text-muted" />}
            placeholder="Email address"
          />
          <Input
            type="password"
            trailing={<Eye className="size-4 text-muted cursor-pointer" />}
            placeholder="Password"
          />
        </div>
      </Exhibit.Stage>

      {/* Label & Helper Section */}
      <Exhibit.Stage section={sections.labelAndHelper} code={INPUT_LABEL_HELPER_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input
            label="Email Address"
            description="We will only use this to send transaction receipts."
            placeholder="name@company.com"
          />
        </div>
      </Exhibit.Stage>

      {/* Floating Label Section */}
      <Exhibit.Stage section={sections.floatingLabel} code={INPUT_FLOATING_LABEL_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input
            floating
            label="First Name"
            placeholder="Enter your first name"
          />
          <Input
            floating
            label="Email Address"
            defaultValue="ada@homonoid.dev"
          />
          <Input
            floating
            label="Search Library"
            leading={<Search className="size-4 text-muted" />}
          />
        </div>
      </Exhibit.Stage>

      {/* Validation Section */}
      <Exhibit.Stage section={sections.validation} code={INPUT_VALIDATION_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input
            invalid
            label="Username"
            error="This username is already taken."
            defaultValue="lumunar"
          />
        </div>
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={INPUT_DISABLED_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Input
            disabled
            label="Account ID"
            defaultValue="acc_983142"
            description="System managed identifier cannot be modified."
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Homonoid requires that state transitions preserve component identity without abrupt dimensional shifts. The container outer bounds and border radius remain constant when switching between rest, hover, focus, and invalid states.
        </Description>

        <Description>
          Accommodating leading or trailing elements preserves container boundaries and vertical alignment without layout shift.
        </Description>

        <Description>
          Color transitions for background and border interpolate smoothly using defined motion duration and standard easing curve tokens.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility is fundamental to every Homonoid form primitive. We design text fields to offer unambiguous operational cues, robust input validation announcements, and complete assistive device compatibility.
        </Description>

        <Description>
          Inputs automatically associate accompanying label and helper text using aria labelledby and aria describedby relationships. When errors occur, invalid state cues and live region error announcements guide users directly toward resolution.
        </Description>

        <Description>
          Visible focus rings encircle the input boundary during keyboard focus, meeting strict contrast ratios and ensuring effortless field navigation across complex forms.
        </Description>
      </Exhibit.Section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={sections.interactiveStates.id}
        title={sections.interactiveStates.label}
        description="The input supports both CSS pseudo classes and data attributes for flexibility:"
        items={INPUT_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Input containers share identical height tokens with buttons to ensure consistent vertical rhythm when grouped horizontally across forms and toolbars.
        </Description>

        <Description>
          Typography tokens scale progressively across sizes, utilizing small text for compact displays, regular body text for standard forms, and large text for prominent inputs.
        </Description>

        <Description>
          Interactive transitions for container borders and ring outlines execute using standard fast motion tokens and cubic bezier easing curves.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Outlined inputs establish a crisp hairline boundary around the text entry surface, projecting a dedicated focus ring when keyboard navigation engages.
        </Description>

        <Description>
          Filled inputs provide a comfortable tinted background container with soft border accents, offering clear visual separation within lighter interfaces.
        </Description>

        <Description>
          Plain inputs omit borders and container fills at rest, blending seamlessly into data dense tables and inline content editing contexts.
        </Description>

        <Description>
          Form captions and validation messages align beneath the container frame, shifting into high visibility destructive tones when validation conditions fail.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
