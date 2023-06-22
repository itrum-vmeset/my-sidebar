import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CharacteristicsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Record<string, string>[];
  changeValue: (item: Record<string, string>[]) => void;
  name: string;
}
