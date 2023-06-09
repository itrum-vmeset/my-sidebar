import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TagsInputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: any;
  onChange: (element: any) => void;
}
