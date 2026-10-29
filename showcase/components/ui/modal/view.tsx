"use client";

import type { ComponentProps } from "react";
import { Modal, Button, Description, useModalContext } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
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
  const sections = MODAL_SECTIONS;

  return (
    <Exhibit
      title="Modal"
      summary="A modal displays an elevated dialog surface over the application canvas to focus user attention on a discrete task, critical confirmation, or rich sub flow."
      description="Modals interrupt standard workflow by rendering a dimmed backdrop overlay and trapping keyboard focus, requiring explicit dismissal or completion before users return to the primary interface."
      component="modal"
      importCode='import { Modal } from "@homonoid/react";'
      defaultCode={MODAL_DEFAULT_CODE_SAMPLE}
      defaultStage={
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
      }
      sections={MODAL_SECTIONS_LIST}
    >
      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={MODAL_SIZES_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Backdrop Variants Section */}
      <Exhibit.Stage section={sections.backdrop} code={MODAL_BACKDROP_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Dismiss Control Section */}
      <Exhibit.Stage section={sections.dismiss} code={MODAL_DISMISS_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Scroll Modes Section */}
      <Exhibit.Stage section={sections.scroll} code={MODAL_SCROLL_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Modal dialog surfaces preserve dimensional stability and spatial continuity across enter and exit transitions. Floating layers scale smoothly from initial triggers without clipping borders or jumping positions.
        </Description>

        <Description>
          Backdrop overlays calibrate transition curves against document canvases, keeping ambient visual context anchored while elevating focused surfaces.
        </Description>

        <Description>
          Scroll boundaries isolate content flow within designated containers, ensuring background document stability and preventing scroll displacement across open states.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Every modal dialog exposes standard dialog ARIA semantics, signals modal boundaries, and coordinates native keyboard navigation.
        </Description>

        <Description>
          Focus management locks Tab key traversal within the active dialog, initializes focus upon opening, and restores focus to triggers on dismissal.
        </Description>

        <Description>
          Backdrops maintain accessible click outside interception and respect user reduced motion preferences by defaulting to opacity fades.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Surface elevations consume surface and border tokens dynamically across light and dark themes with zero hardcoded hex codes.
        </Description>

        <Description>
          Padding insets map directly to spatial tokens preserving unified rhythm across dialog headers, bodies, and footers.
        </Description>

        <Description>
          Motion curves leverage standardized transition durations and cubic bezier easing for cohesive entrance and exit dynamics.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Direct trigger elements bind automatically to floating reference targets without intermediate artificial wrapper containers.
        </Description>

        <Description>
          Portal rendering ensures modal dialogs mount outside restrictive parent overflow contexts into top level document nodes.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
