"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  cond,
  Kbd,
  Searchbar,
  type SearchbarRadius,
  type SearchbarSize,
  type SearchbarVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSearchbarCode } from "./model";

export function SearchbarView() {
  const [variant, setVariant] = useState<SearchbarVariant>("outlined");
  const [size, setSize] = useState<SearchbarSize>("md");
  const [radius, setRadius] = useState<SearchbarRadius>("lg");
  const [loading, setLoading] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showTrailing, setShowTrailing] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const code = useMemo(
    () =>
      getSearchbarCode({
        variant,
        size,
        radius,
        loading,
        showLeading,
        showTrailing,
        disabled,
      }),
    [variant, size, radius, loading, showLeading, showTrailing, disabled]
  );

  return (
    <Studio
      title="Searchbar"
      description="Interactive query field providing real time discovery, keyboard shortcuts, and asynchronous network feedback across views."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["outlined", "contained", "plain"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        radius: {
          value: radius,
          options: ["full", "lg", "md", "sm", "none"],
          onChange: setRadius,
        },
        switches: [
          {
            id: "loading",
            label: "Loading State",
            description: "Display asynchronous query progress",
            checked: loading,
            onChange: setLoading,
          },
          {
            id: "leading",
            label: "Search Icon",
            description: "Display leading discovery glyph",
            checked: showLeading,
            onChange: setShowLeading,
          },
          {
            id: "trailing",
            label: "Shortcut Keycap",
            description: "Display hotkey command annotation",
            checked: showTrailing,
            onChange: setShowTrailing,
            disabled: loading,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate query interaction",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
      }}
    >
      <div className="w-full max-w-sm p-4">
        <Searchbar
          variant={variant}
          size={size}
          radius={radius}
          loading={loading}
          disabled={disabled}
          placeholder="Search documentation..."
          leading={cond(showLeading, <Search className="size-4" />, undefined)}
          trailing={cond(showTrailing && !loading, <Kbd size="sm" keyValue="command" content="K" />, undefined)}
        />
      </div>
    </Studio>
  );
}

