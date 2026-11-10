"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { match, when, Select, Sidebar as _Sidebar, Switch } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";

export interface InspectorControlSelect {
  value: string;
  options?: string[];
  onChange: (val: any) => void;
  placeholder?: string;
}

export type InspectorControlVariant = InspectorControlSelect;
export type InspectorControlSize = InspectorControlSelect;

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
  color?: InspectorControlSelect;
  size?: InspectorControlSize;
  radius?: InspectorControlSelect;
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

const RADIUS_LABELS: Record<string, string> = {
  none: "None",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  full: "Full",
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

  const { variant, color, size, radius, switches, children } = config;

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
        {when(
          Boolean(variant),
          <Select
            value={variant?.value}
            onValueChange={variant?.onChange}
            size="sm"
            placeholder={variant?.placeholder ?? "Select variant"}
            options={(variant?.options ?? ["plain", "outlined", "contained"]).map(
              (opt: string) => ({
                value: opt,
                label: opt.charAt(0).toUpperCase() + opt.slice(1),
              })
            )}
          />
        )}

        {when(
          Boolean(color),
          <Select
            value={color?.value}
            onValueChange={color?.onChange}
            size="sm"
            placeholder={color?.placeholder ?? "Select color"}
            options={(color?.options ?? ["surface", "primary", "subtle", "destructive"]).map(
              (opt: string) => ({
                value: opt,
                label: opt.charAt(0).toUpperCase() + opt.slice(1),
              })
            )}
          />
        )}

        {when(
          Boolean(size),
          <Select
            value={size?.value}
            onValueChange={size?.onChange}
            size="sm"
            placeholder={size?.placeholder ?? "Select size"}
            options={(size?.options ?? ["sm", "md", "lg"]).map((opt: string) => ({
              value: opt,
              label: match(opt, SIZE_LABELS, opt.charAt(0).toUpperCase() + opt.slice(1)),
            }))}
          />
        )}

        {when(
          Boolean(radius),
          <Select
            value={radius?.value}
            onValueChange={radius?.onChange}
            size="sm"
            placeholder={radius?.placeholder ?? "Select radius"}
            options={(radius?.options ?? ["full", "lg", "md", "sm", "none"]).map(
              (opt: string) => ({
                value: opt,
                label: match(opt, RADIUS_LABELS, opt.charAt(0).toUpperCase() + opt.slice(1)),
              })
            )}
          />
        )}

        {when(
          Boolean(switches && switches.length > 0),
          <div className="flex flex-col gap-1">
            {switches?.map((item) => (
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
