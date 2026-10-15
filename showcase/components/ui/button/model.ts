export const BUTTON_CONTAINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle">
      Click me
    </Button>
  );
}`;

export const BUTTON_OUTLINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="outlined" shape="circle">
      Click me
    </Button>
  );
}`;

export const BUTTON_ICON_CODE_SAMPLE = `import { Button } from "@harmonia/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Button layout="icon" variant="contained" shape="circle" aria-label="Add item">
      <Plus className="size-4" />
    </Button>
  );
}`;

export interface ButtonViewModel {
  containedCodeSample: string;
  outlinedCodeSample: string;
  iconCodeSample: string;
}