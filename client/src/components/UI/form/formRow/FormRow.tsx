import { ReactComponent as DelIcon } from "../../../../assets/icons/del.svg";
import { Input } from "../../input/Input";

import styles from "./FormRow.module.css";

interface FormRowProps {
  changeRow: (item: any) => void;
  removeRow: (id: number) => void;
  item: any;
}

function FormRow({ item, changeRow, removeRow }: FormRowProps): JSX.Element {
  const itemKeys = Object.keys(item);

  return (
    <div key={item.id} className={styles.row}>
      <Input
        value={Object.values(item)[1] as string}
        onChange={(e) =>
          changeRow({ ...item, [`${itemKeys[1]}`]: e.target.value })
        }
      />
      <Input
        value={Object.values(item)[2] as string}
        onChange={(e) =>
          changeRow({ ...item, [`${itemKeys[2]}`]: e.target.value })
        }
      />
      <DelIcon onClick={() => removeRow(item.id)} />
    </div>
  );
}

export default FormRow;
