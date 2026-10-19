import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Maximize2,
  Sliders,
  ScrollText,
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

export function DefaultModal() {
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
              <Button variant="surface">Cancel</Button>
              <Button variant="contained">Confirm</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}`;

export const MODAL_SIZES_CODE_SAMPLE = `<Modal size="md">
  <Button variant="outlined">Open Medium Modal</Button>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Heading>Medium Dialog</Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          Standard balanced proportion for general workflows.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained">Done</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`;

export const MODAL_BACKDROP_CODE_SAMPLE = `<Modal>
  <Button variant="outlined">Blur Backdrop</Button>
  <Modal.Backdrop variant="blur" isDismissable={true}>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Heading>Blur Backdrop</Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          Ambient background blur filter with click outside dismissal.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained">Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`;

export const MODAL_SCROLL_CODE_SAMPLE = `<Modal scroll="inside">
  <Button variant="outlined">Scroll Inside</Button>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Heading>Terms and Conditions</Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          {/* Scrollable content inside pinned header and footer */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained">Accept</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`;

export const MODAL_DISMISS_CODE_SAMPLE = `<Modal>
  <Button variant="outlined">Non Dismissable Dialog</Button>
  <Modal.Backdrop isDismissable={false}>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Heading>Mandatory Action</Modal.Heading>
        </Modal.Header>
        <Modal.Body>
          Clicking outside will not close this dialog.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained">Acknowledge</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`;

