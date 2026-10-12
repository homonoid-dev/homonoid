"use client";

import { useState } from "react";
import { Button } from "@harmonia/web";
import { Plus } from "lucide-react";

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
        <Button variant="primary" loading={loading}>
          Primary
        </Button>
        <Button variant="secondary" loading={loading}>
          Secondary
        </Button>
        <Button variant="outline" loading={loading}>
          Outline
        </Button>
        <Button variant="ghost" loading={loading}>
          Ghost
        </Button>
        <Button variant="destructive" loading={loading}>
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
        <Button shape="circle" size="md" layout="icon"><Plus /></Button>
        <Button shape="circle">Circle / Pill</Button>
        <Button shape="square">Square</Button>
      </div>

      {/* Object Continuity Loading Toggle */}
      <div className="pt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLoading(!loading)}
        >
          Toggle Loading: {loading ? "ON" : "OFF"}
        </Button>
      </div>
    </main>
  );
}
