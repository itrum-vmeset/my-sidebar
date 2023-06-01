import { DetailedHTMLProps, HTMLAttributes } from "react";

interface NavItem {
  id: number;
  title: string;
  value: string;
}

export interface NavigatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  navItems: NavItem[];
  setActiveRoute: (value: string) => void;
  activeRoute: string;
}
