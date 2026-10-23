"use client";

import type { ComponentProps } from "react";
import { Modal, Button, Heading, Description, Card, useModalContext } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  MODAL_SECTIONS,
  MODAL_SECTIONS_LIST,
  MODAL_DEFAULT_CODE_SAMPLE,
  MODAL_SIZES_CODE_SAMPLE,
  MODAL_BACKDROP_CODE_SAMPLE,
  MODAL_SCROLL_CODE_SAMPLE,
  MODAL_DISMISS_CODE_SAMPLE,
} from "./model";

function Dismisser({
  children = "Close",
  ...props
}: ComponentProps<typeof Button>) {
  const { setOpen } = useModalContext();
  return (
    <Button {...props} onClick={() => setOpen(false)}>
      {children}
    </Button>
  );
}

export function ModalView() {
  useToc(MODAL_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Modal</Heading>
          <Description>
            A modal displays an elevated dialog surface over the application canvas to focus user attention on a discrete task, critical confirmation, or rich sub flow.
          </Description>
        </div>
        <Description>
          Modals interrupt standard workflow by rendering a dimmed backdrop overlay and trapping keyboard focus, requiring explicit dismissal or completion before users return to the primary interface.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="modal" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Modal } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={MODAL_DEFAULT_CODE_SAMPLE}>
          <div className="flex items-center justify-center p-6">
            <Modal>
              <Button variant="contained">Open Modal</Button>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog>
                    <Modal.Header>
                      <Modal.Heading>Confirmation</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to proceed with this operation? This action will apply changes immediately.
                    </Modal.Body>
                    <Modal.Footer>
                      <Dismisser variant="plain">Cancel</Dismisser>
                      <Dismisser variant="contained">Confirm</Dismisser>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={MODAL_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={MODAL_SECTIONS.sizes.icon} />
          <Heading size="md" as="h2">
            {MODAL_SECTIONS.sizes.label}
          </Heading>
        </div>

        <Stage code={MODAL_SIZES_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {(["sm", "md", "lg", "cover", "full"] as const).map((size) => (
              <Modal key={size}>
                <Button variant="outlined">
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
                <Modal.Backdrop>
                  <Modal.Container size={size}>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Heading>
                          Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                        </Modal.Heading>
                      </Modal.Header>
                      <Modal.Body>
                        This modal is configured with the {size} size variant.
                      </Modal.Body>
                      <Modal.Footer>
                        <Dismisser variant="contained">Done</Dismisser>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            ))}
          </div>
        </Stage>
      </section>

      {/* Backdrop Variants Section */}
      <section
        id={MODAL_SECTIONS.backdrop.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={MODAL_SECTIONS.backdrop.icon} />
          <Heading size="md" as="h2">
            {MODAL_SECTIONS.backdrop.label}
          </Heading>
        </div>

        <Stage code={MODAL_BACKDROP_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {(["blur", "opaque", "transparent"] as const).map((variant) => (
              <Modal key={variant}>
                <Button variant="outlined">
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
                <Modal.Backdrop variant={variant}>
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Heading>
                          {variant.charAt(0).toUpperCase() + variant.slice(1)}
                        </Modal.Heading>
                      </Modal.Header>
                      <Modal.Body>
                        This modal demonstrates the {variant} backdrop variant.
                      </Modal.Body>
                      <Modal.Footer>
                        <Dismisser variant="contained">Dismiss</Dismisser>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            ))}
          </div>
        </Stage>
      </section>

      {/* Dismiss Control Section */}
      <section
        id={MODAL_SECTIONS.dismiss.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={MODAL_SECTIONS.dismiss.icon} />
          <Heading size="md" as="h2">
            {MODAL_SECTIONS.dismiss.label}
          </Heading>
        </div>

        <Stage code={MODAL_DISMISS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {[
              {
                isDismissable: true,
                label: "Dismissable",
                description: "Clicking outside on the backdrop will dismiss this modal.",
              },
              {
                isDismissable: false,
                label: "Non Dismissable",
                description: "Clicking outside will not close this dialog.",
              },
            ].map((item) => (
              <Modal key={item.label}>
                <Button variant="outlined">
                  {item.label}
                </Button>
                <Modal.Backdrop isDismissable={item.isDismissable}>
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Heading>{item.label}</Modal.Heading>
                      </Modal.Header>
                      <Modal.Body>{item.description}</Modal.Body>
                      <Modal.Footer>
                        <Dismisser variant="contained">Close</Dismisser>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            ))}
          </div>
        </Stage>
      </section>

      {/* Scroll Modes Section */}
      <section
        id={MODAL_SECTIONS.scroll.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={MODAL_SECTIONS.scroll.icon} />
          <Heading size="md" as="h2">
            {MODAL_SECTIONS.scroll.label}
          </Heading>
        </div>

        <Stage code={MODAL_SCROLL_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {[
              { mode: "inside" as const, label: "Scroll Inside", title: "Internal Scroll Mode", count: 20 },
              { mode: "outside" as const, label: "Scroll Outside", title: "Outside Scroll Mode", count: 24 },
            ].map((item) => (
              <Modal key={item.mode} scroll={item.mode}>
                <Button variant="outlined">
                  {item.label}
                </Button>
                <Modal.Backdrop>
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Heading>{item.title}</Modal.Heading>
                      </Modal.Header>
                      <Modal.Body className="space-y-4">
                        {Array.from({ length: item.count }).map((_, i) => (
                          <p key={i}>
                            Paragraph {i + 1}: Homonoid modal demonstrating {item.mode} scroll mechanics.
                          </p>
                        ))}
                      </Modal.Body>
                      <Modal.Footer>
                        <Dismisser variant="contained">Close</Dismisser>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            ))}
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={MODAL_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {MODAL_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Modal dialog surfaces preserve dimensional stability and spatial continuity across enter and exit transitions. Floating layers scale smoothly from initial triggers without clipping borders or jumping positions.
        </Description>

        <Description>
          Backdrop overlays calibrate transition curves against document canvases, keeping ambient visual context anchored while elevating focused surfaces.
        </Description>

        <Description>
          Scroll boundaries isolate content flow within designated containers, ensuring background document stability and preventing scroll displacement across open states.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={MODAL_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {MODAL_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Every modal dialog exposes standard dialog ARIA semantics, signals modal boundaries, and coordinates native keyboard navigation.
        </Description>

        <Description>
          Focus management locks Tab key traversal within the active dialog, initializes focus upon opening, and restores focus to triggers on dismissal.
        </Description>

        <Description>
          Backdrops maintain accessible click outside interception and respect user reduced motion preferences by defaulting to opacity fades.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={MODAL_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {MODAL_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Surface elevations consume surface and border tokens dynamically across light and dark themes with zero hardcoded hex codes.
        </Description>

        <Description>
          Padding insets map directly to spatial tokens preserving unified rhythm across dialog headers, bodies, and footers.
        </Description>

        <Description>
          Motion curves leverage standardized transition durations and cubic bezier easing for cohesive entrance and exit dynamics.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={MODAL_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {MODAL_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Direct trigger elements bind automatically to floating reference targets without intermediate artificial wrapper containers.
        </Description>

        <Description>
          Portal rendering ensures modal dialogs mount outside restrictive parent overflow contexts into top level document nodes.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
