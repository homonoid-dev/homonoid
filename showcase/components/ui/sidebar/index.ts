import { Sidebar as SidebarRoot } from "./Sidebar";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem, SidebarDestination } from "./SidebarItem";

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Item: SidebarItem,
  Destination: SidebarDestination,
});

export { SidebarHeader, SidebarItem, SidebarDestination };
export { useSidebar } from "./context";
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarItemProps,
  SidebarDestinationProps,
  SidebarSide,
} from "./types";



