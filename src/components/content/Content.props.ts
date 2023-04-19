import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IParam } from "../../models/IResponse";

export interface ContentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  service: {
    getAll: (params: IParam) => Promise<any>;
  };
}
