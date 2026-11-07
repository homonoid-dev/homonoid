"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Select, Sidebar as _Sidebar, Switch } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";

export interface InspectorControlVariant {
  value: string;
  options?: string[];
  onChange: (val: any) => void;
}

export interface InspectorControlSize {
  value: string;
  options?: string[];
  onChange: (val: any) => void;
}

export interface InspectorControlSwitch {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface InspectorConfig {
  variant?: InspectorControlVariant;
  size?: InspectorControlSize;
  switches?: InspectorControlSwitch[];
  children?: ReactNode;
}

interface InspectorContextValue {
  config: InspectorConfig | null;
  setConfig: (config: InspectorConfig | null) => void;
}

const InspectorContext = createContext<InspectorContextValue | null>(null);

export function InspectorProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<InspectorConfig | null>(null);
  return (
    <InspectorContext.Provider value={{ config, setConfig }}>
      {children}
    </InspectorContext.Provider>
  );
}

export function useInspector() {
  return useContext(InspectorContext);
}

const SIZE_LABELS: Record<string, string> = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};

export interface InspectorProps {
  className?: string;
}

export function Inspector({ className }: InspectorProps = {}) {
  const pathname = usePathname();
  const context = useInspector();
  const config = context?.config;

  if (pathname === "/components" || !config) {
    return null;
  }

  const { variant, size, switches, children } = config;

  return (
    <_Sidebar
      side="right"
      width="w-64"
      className={cn(
        "sticky top-0 self-start h-screen shrink-0 hidden md:flex select-none",
        className
      )}
    >
      <_Sidebar.Content className="p-3 flex flex-col gap-3">
        {variant && (
          <Select
            value={variant.value}
            onValueChange={variant.onChange}
            size="sm"
            placeholder="Select variant"
            options={(variant.options ?? ["plain", "outlined", "contained"]).map(
              (opt) => ({
                value: opt,
                label: opt.charAt(0).toUpperCase() + opt.slice(1),
              })
            )}
          />
        )}

        {size && (
          <Select
            value={size.value}
            onValueChange={size.onChange}
            size="sm"
            placeholder="Select size"
            options={(size.options ?? ["sm", "md", "lg"]).map((opt) => ({
              value: opt,
              label: SIZE_LABELS[opt] ?? opt.charAt(0).toUpperCase() + opt.slice(1),
            }))}
          />
        )}

        {switches && switches.length > 0 && (
          <div className="flex flex-col gap-1">
            {switches.map((item) => (
              <Switch.Tile
                key={item.id}
                size="sm"
                label={item.label}
                description={item.description}
                checked={item.checked}
                onChange={item.onChange}
                disabled={item.disabled}
              />
            ))}
          </div>
        )}

        {children}
      </_Sidebar.Content>
    </_Sidebar>
  );
}
