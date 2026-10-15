export const BUTTON_CONTAINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle">
      Click me
    </Button>
  );
}`;

export const BUTTON_VARIANTS_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Button variant="contained" color="primary" shape="circle">
        Primary
      </Button>
      <Button variant="contained" color="subtle" shape="circle">
        Subtle
      </Button>
      <Button variant="outlined" shape="circle">
        Outline
      </Button>
      <Button variant="plain" shape="circle">
        Ghost
      </Button>
      <Button variant="contained" color="destructive" shape="circle">
        Destructive
      </Button>
    </div>
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

export const BUTTON_WITH_ICON_CODE_SAMPLE = `import { Button } from "@harmonia/react";
import { ArrowRight } from "lucide-react";

export function Example() {
  return (
    <Button
      variant="contained"
      shape="circle"
      leading={<ArrowRight className="size-4" />}
    >
      Click me
    </Button>
  );
}`;

export const BUTTON_ICON_ONLY_CODE_SAMPLE = `import { Button } from "@harmonia/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Button
      layout="icon"
      variant="contained"
      shape="circle"
      aria-label="Add item"
    >
      <Plus className="size-4" />
    </Button>
  );
}`;

export interface ButtonViewModel {
  containedCodeSample: string;
  variantsCodeSample: string;
  outlinedCodeSample: string;
  withIconCodeSample: string;
  iconOnlyCodeSample: string;
}