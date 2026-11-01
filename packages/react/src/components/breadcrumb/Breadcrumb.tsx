"use client";

import { forwardRef, Fragment } from "react";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { BreadcrumbContext } from "./BreadcrumbContext";
import { BreadcrumbList } from "./BreadcrumbList";
import { BreadcrumbItem } from "./BreadcrumbItem";
import { BreadcrumbLink } from "./BreadcrumbLink";
import { BreadcrumbPage } from "./BreadcrumbPage";
import { BreadcrumbSeparator } from "./BreadcrumbSeparator";
import { BreadcrumbEllipsis } from "./BreadcrumbEllipsis";
import type { BreadcrumbComponent, BreadcrumbItemData, BreadcrumbProps } from "./types";

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      items,
      separator,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) {
    const isAtomic = Boolean(items && items.length > 0);

    const renderItemContent = (item: BreadcrumbItemData, isLast: boolean) => {
      const isTerminal = Boolean(isLast || item.current || !item.href);

      if (isTerminal) {
        return (
          <BreadcrumbPage>
            {when(
              Boolean(item.icon),
              <span className="inline-flex shrink-0 items-center justify-center">{item.icon}</span>
            )}
            {item.label}
          </BreadcrumbPage>
        );
      }

      return (
        <BreadcrumbLink
          href={item.href}
          disabled={item.disabled}
          onClick={item.onClick}
        >
          {when(
            Boolean(item.icon),
            <span className="inline-flex shrink-0 items-center justify-center">{item.icon}</span>
          )}
          {item.label}
        </BreadcrumbLink>
      );
    };

    const renderAtomicList = () => {
      if (!items || items.length === 0) return null;

      const shouldCollapse =
        Boolean(maxItems) &&
        items.length > (maxItems as number) &&
        items.length > itemsBeforeCollapse + itemsAfterCollapse;

      if (!shouldCollapse) {
        return (
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {renderItemContent(item, isLast)}
                  </BreadcrumbItem>
                  {when(!isLast, <BreadcrumbSeparator />)}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        );
      }

      const beforeItems = items.slice(0, itemsBeforeCollapse);
      const afterItems = items.slice(items.length - itemsAfterCollapse);

      return (
        <BreadcrumbList>
          {beforeItems.map((item, index) => (
            <Fragment key={`before-${index}`}>
              <BreadcrumbItem>{renderItemContent(item, false)}</BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}

          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {afterItems.map((item, index) => {
            const isLast = index === afterItems.length - 1;
            return (
              <Fragment key={`after-${index}`}>
                <BreadcrumbItem>{renderItemContent(item, isLast)}</BreadcrumbItem>
                {when(!isLast, <BreadcrumbSeparator />)}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      );
    };

    return (
      <BreadcrumbContext.Provider value={{ size, separator }}>
        <nav
          ref={ref}
          aria-label={props["aria-label"] || "Breadcrumb"}
          className={cn("relative", className)}
          {...props}
        >
          {cond(isAtomic, renderAtomicList(), children)}
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
) as BreadcrumbComponent;

Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
