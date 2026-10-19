"use client";

import { useState } from "react";
import { Modal, Button, Label, Description, Card, useModalContext } from "@homonoid/react";
import type { ModalBackdropVariant } from "@homonoid/react";
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

function CloseButton({ children = "Close" }: { children?: string }) {
  const { setOpen } = useModalContext();
  return (
    <Button variant="contained" onClick={() => setOpen(false)}>
      {children}
    </Button>
  );
}

function ConfirmButton({ children = "Confirm" }: { children?: string }) {
  const { setOpen } = useModalContext();
  return (
    <Button variant="contained" onClick={() => setOpen(false)}>
      {children}
    </Button>
  );
}

export function ModalView() {
  useToc(MODAL_SECTIONS_LIST);

  const [backdropVariant, setBackdropVariant] =
    useState<ModalBackdropVariant>("blur");
  const [backdropModalOpen, setBackdropModalOpen] = useState(false);

  const [dismissable, setDismissable] = useState(true);
  const [dismissModalOpen, setDismissModalOpen] = useState(false);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Modal</Label>
        <Description>
          A modal displays an elevated dialog surface over the application canvas to focus user attention on a discrete task, critical confirmation, or rich sub flow.
        </Description>
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
          className="flex items-center justify-between font-mono text-xs select-text"
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
                      <CloseButton>Cancel</CloseButton>
                      <ConfirmButton>Confirm</ConfirmButton>
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
          <Label size="lg" as="h2">
            {MODAL_SECTIONS.sizes.label}
          </Label>
        </div>

        <Description>
          Modals scale across five distinct dimensions from compact prompts to full screen viewports.
        </Description>

        <Stage code={MODAL_SIZES_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {(["sm", "md", "lg", "cover", "full"] as const).map((size) => (
              <Modal key={size}>
                <Button variant="outlined" color="surface">
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
                        <Button slot="close" variant="contained">
                          Done
                        </Button>
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
          <Label size="lg" as="h2">
            {MODAL_SECTIONS.backdrop.label}
          </Label>
        </div>

        <Description>
          Backdrop planes support blur, opaque, and transparent styling variants controlled directly on the backdrop element.
        </Description>

        <Stage code={MODAL_BACKDROP_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            {(["blur", "opaque", "transparent"] as ModalBackdropVariant[]).map(
              (variant) => (
                <Button
                  key={variant}
                  variant="outlined"
                  color="surface"
                  onClick={() => {
                    setBackdropVariant(variant);
                    setBackdropModalOpen(true);
                  }}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              )
            )}
          </div>
        </Stage>

        <Modal
          open={backdropModalOpen}
          onOpenChange={setBackdropModalOpen}
        >
          <Modal.Backdrop variant={backdropVariant}>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>
                    {backdropVariant.charAt(0).toUpperCase() + backdropVariant.slice(1)} Backdrop
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  This dialog demonstrates the {backdropVariant} backdrop presentation.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    onClick={() => setBackdropModalOpen(false)}
                  >
                    Dismiss
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </section>

      {/* Dismiss Control Section */}
      <section
        id={MODAL_SECTIONS.dismiss.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Label size="lg" as="h2">
            {MODAL_SECTIONS.dismiss.label}
          </Label>
        </div>

        <Description>
          Backdrops configure click outside dismissal behavior via the isDismissable property.
        </Description>

        <Stage code={MODAL_DISMISS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            <Button
              variant="outlined"
              color="surface"
              onClick={() => {
                setDismissable(true);
                setDismissModalOpen(true);
              }}
            >
              Dismissable
            </Button>
            <Button
              variant="outlined"
              color="surface"
              onClick={() => {
                setDismissable(false);
                setDismissModalOpen(true);
              }}
            >
              Non Dismissable
            </Button>
          </div>
        </Stage>

        <Modal
          open={dismissModalOpen}
          onOpenChange={setDismissModalOpen}
        >
          <Modal.Backdrop isDismissable={dismissable}>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>
                    {dismissable ? "Dismissable Modal" : "Non Dismissable Modal"}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  {dismissable
                    ? "Clicking outside on the backdrop or pressing Escape will dismiss this modal."
                    : "Clicking outside will not close this dialog. You must click the confirmation button below."}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    onClick={() => setDismissModalOpen(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </section>

      {/* Scroll Modes Section */}
      <section
        id={MODAL_SECTIONS.scroll.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Label size="lg" as="h2">
            {MODAL_SECTIONS.scroll.label}
          </Label>
        </div>

        <Description>
          Modals support both internal content scrolling and viewport level scrolling when dialog bodies contain extensive copy.
        </Description>

        <Stage code={MODAL_SCROLL_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-control-gap p-6">
            <Modal scroll="inside">
              <Button variant="outlined" color="surface">
                Scroll Inside
              </Button>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog>
                    <Modal.Header>
                      <Modal.Heading>Internal Scroll Mode</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="space-y-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <p key={i}>
                          Paragraph {i + 1}: Homonoid modals preserve pinned headers and footers while allowing the central body region to scroll smoothly with contained overscroll boundaries.
                        </p>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <CloseButton>Close</CloseButton>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            <Modal scroll="outside">
              <Button variant="outlined" color="surface">
                Scroll Outside
              </Button>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog>
                    <Modal.Header>
                      <Modal.Heading>Outside Scroll Mode</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="space-y-4">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <p key={i}>
                          Paragraph {i + 1}: Outside scroll mode scrolls the entire modal container naturally across the viewport canvas.
                        </p>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <CloseButton>Close</CloseButton>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </div>
        </Stage>
      </section>

      {/* Accessibility Section */}
      <section
        id={MODAL_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {MODAL_SECTIONS.accessibility.label}
        </Label>

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
        <Label size="lg" as="h2">
          {MODAL_SECTIONS.tokens.label}
        </Label>

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
        <Label size="lg" as="h2">
          {MODAL_SECTIONS.styleReference.label}
        </Label>

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
