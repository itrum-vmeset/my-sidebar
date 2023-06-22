import { DetailedHTMLProps, HTMLAttributes } from "react";

import { Tag } from "../../../models/IProductMockData";

export interface TagsInputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Tag[];
  changeValue: (tags: Tag[]) => void;
}
