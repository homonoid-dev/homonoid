import type {
  ModalBackdropVariant,
  ModalSize,
  ModalVariant,
} from "@homonoid/react";

export interface ModalCodeOptions {
  size: ModalSize;
  variant: ModalVariant;
  backdrop: ModalBackdropVariant;
  dismissable: boolean;
  showFooter: boolean;
}

export function getModalCode(options: ModalCodeOptions): string {
  const { size, variant, backdrop, dismissable, showFooter } = options;

  const modalProps: string[] = [];
  if (size !== "md") {
    modalProps.push(`size="${size}"`);
  }
  if (variant !== "default") {
    modalProps.push(`variant="${variant}"`);
  }

  const backdropProps: string[] = [];
  if (backdrop !== "blur") {
    backdropProps.push(`variant="${backdrop}"`);
  }
  if (!dismissable) {
    backdropProps.push("isDismissable={false}");
  }

  const modalPropStr = modalProps.length > 0 ? ` ${modalProps.join(" ")}` : "";
  const backdropPropStr =
    backdropProps.length > 0 ? ` ${backdropProps.join(" ")}` : "";

  const lines = [
    'import { Modal, Button, Description } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Modal${modalPropStr}>`,
    '      <Button variant="contained">Open Modal</Button>',
    `      <Modal.Backdrop${backdropPropStr}>`,
    "        <Modal.Container>",
    "          <Modal.Dialog>",
    "            <Modal.Header>",
    '              <Modal.Heading>Project Settings</Modal.Heading>',
    "            </Modal.Header>",
    "            <Modal.Body>",
    '              <Description size="sm">',
    "                Changes will immediately apply to active runtime instances.",
    "              </Description>",
    "            </Modal.Body>",
  ];

  if (showFooter) {
    lines.push("            <Modal.Footer>");
    lines.push('              <Button variant="outlined">Cancel</Button>');
    if (variant === "destructive") {
      lines.push('              <Button variant="contained" color="destructive">Delete Project</Button>');
    } else {
      lines.push('              <Button variant="contained">Save Changes</Button>');
    }
    lines.push("            </Modal.Footer>");
  }

  lines.push("          </Modal.Dialog>");
  lines.push("        </Modal.Container>");
  lines.push("      </Modal.Backdrop>");
  lines.push("    </Modal>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

