"use client";

import { useState } from "react";
import { Button, Checkbox, Spinner, type SpinnerAnimation, type SpinnerColor, type Size } from "@harmonia/web";
import { Plus } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<SpinnerAnimation>("border");
  const [activeSize, setActiveSize] = useState<Size>("md");
  const [activeColor, setActiveColor] = useState<SpinnerColor>("primary");

  // Parent/child collection state for indeterminate demonstration
  const [items, setItems] = useState([true, false, false]);
  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const isIndeterminate = someChecked && !allChecked;

  const toggleAll = () => {
    const nextState = !allChecked;
    setItems([nextState, nextState, nextState]);
  };

  const toggleItem = (index: number) => {
    const next = [...items];
    next[index] = !next[index];
    setItems(next);
  };

  return (
    <main className="min-h-screen py-16 px-6 max-w-5xl mx-auto flex flex-col items-center gap-16 bg-background text-foreground">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Harmonia Component System</h1>
        <p className="text-sm text-muted max-w-md">
          Chroma theming, spatial continuity, and physics-driven micro-interactions.
        </p>
      </div>

      {/* Checkbox Component Section */}
      <section className="w-full flex flex-col items-center gap-8 p-8 rounded-2xl border border-border bg-surface">
        <div className="flex flex-col items-center text-center gap-1.5">
          <h2 className="text-xl font-semibold tracking-tight">Checkbox</h2>
          <p className="text-xs text-muted max-w-lg">
            Tri-state deterministic selection control with fluid spring glyph transitions and object continuity.
          </p>
        </div>

        {/* States & Sizes Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interactive States */}
          <div className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">States</span>
            <div className="flex flex-col gap-3">
              <Checkbox label="Unchecked" defaultChecked={false} />
              <Checkbox label="Checked" defaultChecked={true} />
              <Checkbox label="Indeterminate (Mixed)" indeterminate={true} />
              <Checkbox label="Validation Error (Invalid)" invalid={true} />
              <Checkbox label="Disabled Unchecked" disabled={true} defaultChecked={false} />
              <Checkbox label="Disabled Checked" disabled={true} defaultChecked={true} />
            </div>
          </div>

          {/* Sizing Hierarchy */}
          <div className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Sizing Scale</span>
            <div className="flex flex-col gap-4">
              <Checkbox
                size="sm"
                label="Small Control (16px)"
                description="Compact density for tables and dense lists"
                defaultChecked={true}
              />
              <Checkbox
                size="md"
                label="Medium Control (20px)"
                description="Standard density for forms and modals"
                defaultChecked={true}
              />
              <Checkbox
                size="lg"
                label="Large Control (24px)"
                description="Prominent touch density for onboarding and hero cards"
                defaultChecked={true}
              />
            </div>
          </div>
        </div>

        {/* Indeterminate Nested Collection Demo */}
        <div className="w-full flex flex-col gap-4 p-6 rounded-xl border border-border bg-background">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Parent-Child Indeterminate Synchronization
          </span>
          <div className="flex flex-col gap-3 pl-1">
            <Checkbox
              size="md"
              label="Select All Packages"
              description="Dynamically reflects partial selection with indeterminate glyph"
              checked={allChecked ? true : isIndeterminate ? "indeterminate" : false}
              onChange={toggleAll}
            />

            <div className="flex flex-col gap-2.5 pl-6 border-l-2 border-border/60 ml-2.5">
              <Checkbox
                size="sm"
                label="@harmonia/tokens"
                description="Chroma derivation and spatial design tokens"
                checked={items[0]}
                onChange={() => toggleItem(0)}
              />
              <Checkbox
                size="sm"
                label="@harmonia/web"
                description="Platform-native web components (React 19 + Tailwind CSS v4)"
                checked={items[1]}
                onChange={() => toggleItem(1)}
              />
              <Checkbox
                size="sm"
                label="showcase"
                description="Next.js living documentation and interaction workbench"
                checked={items[2]}
                onChange={() => toggleItem(2)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spinner Component Section */}
      <section className="w-full flex flex-col items-center gap-8 p-8 rounded-2xl border border-border bg-surface">
        <div className="flex flex-col items-center text-center gap-1.5">
          <h2 className="text-xl font-semibold tracking-tight">Spinner</h2>
          <p className="text-xs text-muted max-w-lg">
            Indeterminate progress indicator with standardized control scales and physical motion modes.
          </p>
        </div>

        {/* 2 Animations Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Border Animation */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Border (Angular)</span>
            <div className="flex items-center justify-center gap-6 h-16">
              <div className="flex flex-col items-center gap-1">
                <Spinner size="sm" animation="border" color="primary" />
                <span className="text-[10px] text-muted">sm (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner size="md" animation="border" color="primary" />
                <span className="text-[10px] text-muted">md (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner size="lg" animation="border" color="primary" />
                <span className="text-[10px] text-muted">lg (32px)</span>
              </div>
            </div>
            <p className="text-xs text-muted text-center">
              Continuously rotating circular arc on a subdued track.
            </p>
          </div>

          {/* Grow Animation */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-background">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Grow (Radial)</span>
            <div className="flex items-center justify-center gap-6 h-16">
              <div className="flex flex-col items-center gap-1">
                <Spinner size="sm" animation="grow" color="primary" />
                <span className="text-[10px] text-muted">sm (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner size="md" animation="grow" color="primary" />
                <span className="text-[10px] text-muted">md (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Spinner size="lg" animation="grow" color="primary" />
                <span className="text-[10px] text-muted">lg (32px)</span>
              </div>
            </div>
            <p className="text-xs text-muted text-center">
              Rhythmic expansion and contraction with breathing opacity.
            </p>
          </div>
        </div>

        {/* Interactive Customizer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl border border-border bg-background">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted w-20">Animation:</span>
              <div className="flex gap-2">
                {(["border", "grow"] as const).map((anim) => (
                  <Button
                    key={anim}
                    variant={activeAnimation === anim ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveAnimation(anim)}
                  >
                    {anim}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted w-20">Size:</span>
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <Button
                    key={sz}
                    variant={activeSize === sz ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveSize(sz)}
                  >
                    {sz}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted w-20">Color:</span>
              <div className="flex gap-2">
                {(["primary", "subtle", "foreground", "destructive"] as const).map((col) => (
                  <Button
                    key={col}
                    variant={activeColor === col ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveColor(col)}
                  >
                    {col}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-surface min-w-44 min-h-32">
            <Spinner
              size={activeSize}
              animation={activeAnimation}
              color={activeColor}
            />
          </div>
        </div>
      </section>

      {/* Button Preview Section */}
      <section className="w-full flex flex-col items-center gap-8 p-8 rounded-2xl border border-border bg-surface">
        <div className="flex flex-col items-center text-center gap-1.5">
          <h2 className="text-xl font-semibold tracking-tight">Button</h2>
          <p className="text-xs text-muted max-w-lg">
            Interactive buttons with object continuity loading state powered by the new Spinner.
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
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLoading(!loading)}
          >
            Toggle Loading: {loading ? "ON" : "OFF"}
          </Button>
        </div>
      </section>
    </main>
  );
}
