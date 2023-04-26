import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance?: "filled" | "transparent" | "grey";
  children?: ReactNode;
  arrow?: "left" | "right" | "none";
}
