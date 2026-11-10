"use client";

import { useMemo, useState } from "react";
import { FolderSearch } from "lucide-react";
import {
  cond,
  when,
  Button,
  Empty,
  type EmptyBorderStyle,
  type EmptySize,
  type EmptyVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getEmptyCode } from "./model";

export function EmptyView() {
  const [variant, setVariant] = useState<EmptyVariant>("plain");
  const [size, setSize] = useState<EmptySize>("md");
  const [dashed, setDashed] = useState(true);
  const [showMedia, setShowMedia] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showAction, setShowAction] = useState(true);

  const borderStyle: EmptyBorderStyle = cond(dashed, "dashed", "solid");

  const code = useMemo(
    () =>
      getEmptyCode({
        variant,
        size,
        borderStyle,
        showMedia,
        showDescription,
        showAction,
      }),
    [
      variant,
      size,
      borderStyle,
      showMedia,
      showDescription,
      showAction,
    ]
  );

  return (
    <Studio
      title="Empty"
      description="Zero state placeholder communicating absence of records, queries, or data and directing users toward actionable next steps."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["plain", "outlined", "contained"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "media",
            label: "Media Graphic",
            description: "Show illustrative icon placeholder",
            checked: showMedia,
            onChange: setShowMedia,
          },
          {
            id: "description",
            label: "Description",
            description: "Show supportive guidance copy",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "action",
            label: "Action Button",
            description: "Show primary call to action",
            checked: showAction,
            onChange: setShowAction,
          },
          {
            id: "dashed",
            label: "Dashed Stroke",
            description: "Apply dashed border on outlined variant",
            checked: dashed,
            onChange: setDashed,
            disabled: variant !== "outlined",
          },
        ],
      }}
    >
      <div className="w-full max-w-lg p-4">
        <Empty
          variant={variant}
          size={size}
          borderStyle={borderStyle}
          icon={when(
            showMedia,
            <FolderSearch
              className={cond(
                size === "sm",
                "size-5",
                cond(size === "lg", "size-8", "size-6")
              )}
            />
          )}
          title="No projects found"
          description={when(
            showDescription,
            "Get started by creating a new workspace project or inviting teammates."
          )}
          action={when(
            showAction,
            <Button
              variant="contained"
              color="primary"
              size={cond(size === "sm", "sm", "md")}
            >
              Create Project
            </Button>
          )}
        />
      </div>
    </Studio>
  );
}

