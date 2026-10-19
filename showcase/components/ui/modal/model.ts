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
                  <p>
                    {size === "cover" ? (
                      <>
                        This modal uses the <code>cover</code> size variant. It spans nearly the full
                        screen while maintaining rounded corners and standard padding.
                      </>
                    ) : size === "full" ? (
                      <>
                        This modal uses the <code>full</code> size variant. It occupies the entire
                        viewport without any margins or rounded corners, creating a true fullscreen
                        experience.
                      </>
                    ) : (
                      <>
                        This modal uses the <code>{size}</code> size variant, providing a standardized
                        maximum width to suit various content needs.
                      </>
                    )}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="contained">Done</Button>
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
  return (
    <div className="flex flex-wrap items-center justify-center gap-control-gap">
      <Modal>
        <Button variant="outlined" color="surface">Blur</Button>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Blur</Modal.Heading>
              </Modal.Header>
              <Modal.Body>Ambient background blur filter.</Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Dismiss</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal>
        <Button variant="outlined" color="surface">Opaque</Button>
        <Modal.Backdrop variant="opaque">
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Opaque</Modal.Heading>
              </Modal.Header>
              <Modal.Body>Solid darkened overlay plane.</Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Dismiss</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal>
        <Button variant="outlined" color="surface">Transparent</Button>
        <Modal.Backdrop variant="transparent">
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Transparent</Modal.Heading>
              </Modal.Header>
              <Modal.Body>Invisible backdrop surface.</Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Dismiss</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}`;

export const MODAL_DISMISS_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-control-gap">
      <Modal>
        <Button variant="outlined" color="surface">Dismissable</Button>
        <Modal.Backdrop isDismissable={true}>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Dismissable Modal</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                Clicking outside on the backdrop will dismiss this modal.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal>
        <Button variant="outlined" color="surface">Non Dismissable</Button>
        <Modal.Backdrop isDismissable={false}>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Non Dismissable Modal</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                Clicking outside will not close this dialog.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}`;

export const MODAL_SCROLL_CODE_SAMPLE = `import { Modal, Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-control-gap">
      <Modal scroll="inside">
        <Button variant="outlined" color="surface">Scroll Inside</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Internal Scroll Mode</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                <p>Scrollable body region while header and footer stay pinned.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal scroll="outside">
        <Button variant="outlined" color="surface">Scroll Outside</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Outside Scroll Mode</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                <p>Entire modal dialog scrolls naturally within the viewport.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}`;
