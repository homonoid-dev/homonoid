import { Sidebar as SidebarRoot } from "./Sidebar";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Item: SidebarItem,
});

export { SidebarHeader, SidebarItem };
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarItemProps,
} from "./types";
