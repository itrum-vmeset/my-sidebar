import { DetailedHTMLProps, HTMLAttributes } from "react";

import { Product } from "../../../../models/IResponse";

export interface FormListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Product[];
  changeValue: (items: Product[]) => void;
}
