import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ImgLinkRowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  removeLink: (item: string) => void;
  link: string;
}
