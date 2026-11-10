"use client";

import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Empty } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSidebarCode } from "./model";

export function SidebarView() {
  const code = useMemo(() => getSidebarCode(), []);

  return (
    <Studio
      title="Sidebar"
      description="Anchor navigation column structuring application routing and category grouping across persistent viewports."
      code={code}
    >
      <div className="w-full max-w-lg p-12 flex items-center justify-center">
        <Empty
          variant="plain"
          size="md"
          icon={<ArrowLeft className="size-6 text-primary" />}
          title="Look to the left"
          description="The navigation panel anchored to the left of this viewport serves as the live production instance of the Sidebar component."
        />
      </div>
    </Studio>
  );
}

