import { Button, Label, Description } from "@harmonia/react";
import { GithubIcon } from "@/components/icons/github";

export default function Page() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-surface-gap max-w-4xl">
      <Label size="lg">Components</Label>
      <div className="flex flex-col gap-layout-gap">
        <Description>
          Explore the foundational building blocks of the Harmonia Design System.
        </Description>
        <a
          href="https://github.com/lumunar/harmonia/tree/main/packages/react"
          target="_blank"
          rel="noreferrer"
          className="w-fit"
        >
          <Button
            variant="outlined"
            color="surface"
            shape="circle"
            size="sm"
            leading={<GithubIcon className="size-3.5" />}
          >
            Source
          </Button>
        </a>
        <Description>
          Every component is engineered with strict design token hierarchy, continuous state transitions, and native platform accessibility across every surface. They are designed to preserve spatial identity and dimensional stability throughout complex workflows, giving interfaces a refined feel that adapts effortlessly to user interactions.
        </Description>
      </div>
    </div>
  );
}
