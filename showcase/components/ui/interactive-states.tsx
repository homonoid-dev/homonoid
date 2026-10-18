import { Label, Description } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";

export interface InteractiveStateItem {
  label: string;
  selectors: string[];
  note?: string;
}

export interface InteractiveStatesProps {
  id?: string;
  title?: string;
  description?: string;
  items: InteractiveStateItem[];
  className?: string;
}

export function InteractiveStates({
  id,
  title = "Interactive States",
  description,
  items,
  className,
}: InteractiveStatesProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y",
        className
      )}
    >
      {title && <Label size="lg" as="h2">{title}</Label>}

      {description && <Description>{description}</Description>}

      <ul className="list-disc pl-4 flex flex-col gap-2.5 text-sm text-foreground marker:text-muted">
        {items.map((item) => (
          <li key={item.label} className="leading-relaxed">
            <span className="font-semibold text-foreground">{item.label}:</span>{" "}
            {item.selectors.map((selector, index) => (
              <span key={selector}>
                {index > 0 && <span className="text-muted"> or </span>}
                <code className="inline-flex items-center justify-center align-middle font-mono text-xs px-1.5 py-0.5 min-h-[22px] rounded-md bg-surface border border-border text-foreground leading-none">
                  {selector}
                </code>
              </span>
            ))}
            {item.note && (
              <span className="text-muted"> ({item.note})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
