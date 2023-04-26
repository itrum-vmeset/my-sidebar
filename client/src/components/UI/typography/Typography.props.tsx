import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TypographyProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
}
