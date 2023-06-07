import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { User } from "../../../models/IOrder";

export interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  value: any;
  // value: string | User;
  onChange: () => void;
}
