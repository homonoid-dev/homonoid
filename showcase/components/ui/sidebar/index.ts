import { Sidebar as SidebarRoot } from "./sidebar";
import { SidebarHeader } from "./header";
import { SidebarDestination } from "./destination";
import { SidebarToggle } from "./toggle";

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Destination: SidebarDestination,
  Toggle: SidebarToggle,
});

export { SidebarHeader, SidebarDestination, SidebarToggle };
export { useSidebar } from "./context";
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarDestinationProps,
  SidebarToggleProps,
  SidebarSide,
} from "./types";


