import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IMenu } from "../../../models/IMenu";

export interface SidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  menuItems: IMenu[];
}
