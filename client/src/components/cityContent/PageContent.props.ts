import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PageContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  updateItem: (product: any) => void;
  deleteItem: (id: any) => void;
  children: React.ReactNode;
}
