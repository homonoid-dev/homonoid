"use client";

import { useState } from "react";
import { Button } from "@harmonia/react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen p-12 flex flex-col items-center justify-center gap-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Harmonia Button Preview</h1>
        <p className="text-sm text-[var(--muted)]">
          Live testing the Button component with Chroma theming and Object Continuity.
        </p>
      </div>

      {/* Button Variants */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="contained" color="primary" loading={loading}>
          Primary
        </Button>
        <Button variant="outlined" color="subtle" loading={loading}>
          Secondary
        </Button>
        <Button variant="plain" color="subtle" loading={loading}>
          Ghost
        </Button>
        <Button variant="contained" color="destructive" loading={loading}>
          Destructive
        </Button>
      </div>

      {/* Sizing Hierarchy */}
      <div className="flex items-center gap-4">
        <Button size="sm">Small (32px)</Button>
        <Button size="md">Medium (40px)</Button>
        <Button size="lg">Large (48px)</Button>
      </div>

      {/* Shapes */}
      <div className="flex items-center gap-4">
        <Button shape="circle">Circle / Pill</Button>
        <Button shape="square">Square</Button>
      </div>

      {/* Object Continuity Loading Toggle */}
      <div className="pt-4">
        <Button
          variant="outlined"
          color="subtle"
          size="sm"
          onClick={() => setLoading(!loading)}
        >
          Toggle Loading: {loading ? "ON" : "OFF"}
        </Button>
      </div>
    </main>
  );
}
