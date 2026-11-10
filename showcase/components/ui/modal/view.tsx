"use client";

import { useMemo, useState } from "react";
import {
  when,
  Button,
  Description,
  Modal,
  Select,
  type ModalBackdropVariant,
  type ModalSize,
  type ModalVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getModalCode } from "./model";

const BACKDROP_OPTIONS = [
  { value: "opaque", label: "Backdrop: Opaque" },
  { value: "blur", label: "Backdrop: Blur" },
  { value: "transparent", label: "Backdrop: Transparent" },
];

export function ModalView() {
  const [size, setSize] = useState<ModalSize>("md");
  const [variant, setVariant] = useState<ModalVariant>("default");
  const [backdrop, setBackdrop] = useState<ModalBackdropVariant>("blur");
  const [dismissable, setDismissable] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const code = useMemo(
    () =>
      getModalCode({
        size,
        variant,
        backdrop,
        dismissable,
        showFooter,
      }),
    [size, variant, backdrop, dismissable, showFooter]
  );

  return (
    <Studio
      title="Modal"
      description="Elevated dialog surface focusing user attention on high priority confirmations, complex sub flows, or dedicated workflows."
      code={code}
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg", "cover", "full"],
          onChange: setSize,
        },
        variant: {
          value: variant,
          options: ["default", "destructive"],
          onChange: setVariant,
        },
        switches: [
          {
            id: "dismissable",
            label: "Click Dismissal",
            description: "Allow backdrop click to close",
            checked: dismissable,
            onChange: setDismissable,
          },
          {
            id: "footer",
            label: "Action Footer",
            description: "Show confirmation buttons",
            checked: showFooter,
            onChange: setShowFooter,
          },
        ],
        children: (
          <Select
            value={backdrop}
            onValueChange={(val) => setBackdrop(val as ModalBackdropVariant)}
            size="sm"
            placeholder="Backdrop"
            options={BACKDROP_OPTIONS}
          />
        ),
      }}
    >
      <div className="flex items-center justify-center p-8">
        <Modal size={size} variant={variant}>
          <Button variant="contained">Open Modal</Button>
          <Modal.Backdrop variant={backdrop} isDismissable={dismissable}>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>Project Settings</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <Description size="sm">
                    Changes will immediately apply to active runtime instances.
                  </Description>
                </Modal.Body>
                {when(
                  showFooter,
                  <Modal.Footer>
                    <Button variant="outlined">Cancel</Button>
                    {when(
                      variant === "destructive",
                      <Button variant="contained" color="destructive">
                        Delete Project
                      </Button>
                    )}
                    {when(
                      variant !== "destructive",
                      <Button variant="contained">Save Changes</Button>
                    )}
                  </Modal.Footer>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </Studio>
  );
}
