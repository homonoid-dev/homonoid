export type ButtonTab = "preview" | "code";

export const BUTTON_CODE_SAMPLE = `import { Button } from "@harmonia/react";

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

export const PREVIEW_CARD_HEIGHT = 280;
export const CODE_CARD_HEIGHT = 192;

export interface ButtonViewModel {
  activeTab: ButtonTab;
  copiedCode: boolean;
  outlinedTab: ButtonTab;
  copiedOutlinedCode: boolean;
  activeCardHeight: number;
  outlinedCardHeight: number;
  codeSample: string;
  outlinedCodeSample: string;
  setActiveTab: (tab: ButtonTab) => void;
  setOutlinedTab: (tab: ButtonTab) => void;
  handleCopyCode: () => void;
  handleCopyOutlinedCode: () => void;
}
