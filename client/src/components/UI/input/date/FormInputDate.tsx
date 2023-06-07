import { Input } from "../Input";

import { FormInputDateProps } from "./FormInputDate.props";

export const FormInputDate = ({
  value,
  onChange,
}: FormInputDateProps): JSX.Element => {
  return (
    <div>
      <Input
        type="date"
        value={value.split(".").reverse().join("-")}
        onChange={(e) =>
          onChange(
            e.target.value.replaceAll("-", ".").split(".").reverse().join(".")
          )
        }
      />
    </div>
  );
};
