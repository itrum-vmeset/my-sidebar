import { FC } from "react";

import { IPayment } from "../helpers/helpers";

import { IBrand } from "./IResponse";

export interface IFormData {
  id: number;
  title: string;
  Component: FC<any>;
  componentProps: {
    name: string;
    options?: string | IBrand[] | IPayment[];
    disabled?: boolean;
  };
}
