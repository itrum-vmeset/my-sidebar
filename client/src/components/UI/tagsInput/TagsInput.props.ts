import { DetailedHTMLProps, HTMLAttributes } from "react";

import { Tag } from "../../../models/IProductMock";

export interface TagsInputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: Tag[];
  changeValue: (tags: Tag[]) => void;
}
