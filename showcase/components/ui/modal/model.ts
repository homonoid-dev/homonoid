import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Maximize2,
  Sliders,
  ScrollText,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface ModalSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const MODAL_SECTIONS: Record<string, ModalSectionItem> = {
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Maximize2,
  },
  backdrop: {
    id: "backdrop-variants",
    label: "Backdrop Variants",
    icon: Layers,
  },
  dismiss: {
    id: "dismiss-control",
    label: "Dismiss Control",
    icon: Sliders,
  },
  scroll: {
    id: "scroll-modes",
    label: "Scroll Modes",
    icon: ScrollText,
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

export const MODAL_SECTIONS_LIST: ModalSectionItem[] =
  Object.values(MODAL_SECTIONS);

export const MODAL_DEFAULT_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  return (
    <Modal>
      <Button variant="contained">Open Modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Confirmation</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to proceed with this operation?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="plain">Cancel</Button>
              <Button variant="contained">Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}`;

export const MODAL_SIZES_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  const sizes = ["sm", "md", "lg", "cover", "full"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
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
  );
}`;

export const MODAL_BACKDROP_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  const variants = ["blur", "opaque", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="outlined" color="surface">
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
                  <Button slot="close" variant="contained">
                    Dismiss
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}`;

export const MODAL_DISMISS_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  const options = [
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
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((item) => (
        <Modal key={item.label}>
          <Button variant="outlined" color="surface">
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
                  <Button slot="close" variant="contained">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}`;

export const MODAL_SCROLL_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  const modes = [
    { mode: "inside", label: "Scroll Inside", title: "Internal Scroll Mode" },
    { mode: "outside", label: "Scroll Outside", title: "Outside Scroll Mode" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {modes.map((item) => (
        <Modal key={item.mode} scroll={item.mode}>
          <Button variant="outlined" color="surface">
            {item.label}
          </Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>{item.title}</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="space-y-4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <p key={i}>
                      Paragraph {i + 1}: Homonoid modal demonstrating {item.mode} scroll mechanics.
                    </p>
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="contained">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}`;
