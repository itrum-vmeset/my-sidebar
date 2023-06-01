import classNames from "classnames";

import { ReactComponent as SelectIcon } from "../../../../assets/icons/select.svg";
import { translator } from "../../../../helpers/translator";
import { Input } from "../../input/Input";
import SelectModal from "../../selectModal/SelectModal";

import { CustomSelectProps } from "./CustomSelect.props";

import styles from "./CustomSelect.module.css";

function CustomSelect({
  data,
  setData,
  selectModalVisible,
  setSelectModalVisible,
  options,
}: CustomSelectProps): JSX.Element {
  return (
    <div className={styles.customSelect}>
      <Input
        className={styles.selectInput}
        value={translator(data, "") || data}
        onClick={setSelectModalVisible}
        onChange={() => null}
      />
      <SelectModal
        selectModalVisible={selectModalVisible}
        setSelectModalVisible={setSelectModalVisible}
        active={data}
        setData={setData}
        options={options}
      />
      <SelectIcon
        className={classNames(styles.selectIcon, {
          [styles.selectIconActive]: selectModalVisible,
        })}
        onClick={() => {
          setSelectModalVisible(!selectModalVisible);
        }}
      />
    </div>
  );
}

export default CustomSelect;
