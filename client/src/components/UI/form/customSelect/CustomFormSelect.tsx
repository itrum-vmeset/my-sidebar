import classNames from "classnames";

import { ReactComponent as SelectIcon } from "../../../../assets/icons/select.svg";
import { translator } from "../../../../helpers/translator";
import { Input } from "../../input/Input";
import SelectModal from "../../selectModal/SelectModal";

import { CustomFormSelectProps } from "./CustomFormSelect.props";

import styles from "./CustomSelect.module.css";

function CustomFormSelect({
  value,
  changeValue,
  customModalVisible,
  setCustomModalVisible,
  setCategoryModalVisible,
  setSubCategoryModalVisible,
  options,
  name,
}: CustomFormSelectProps): JSX.Element {
  return (
    <div
      className={styles.customSelect}
      onClick={(e) => {
        e.stopPropagation();
        setCustomModalVisible({ [name]: !customModalVisible[name] });
        setCategoryModalVisible(false);
        setSubCategoryModalVisible(false);
      }}
    >
      <Input
        className={styles.selectInput}
        value={
          typeof value === "string"
            ? translator(value, "") || ""
            : value?.name || ""
        }
        onChange={() => null}
      />
      <SelectModal
        selectModalVisible={customModalVisible[name]}
        setSelectModalVisible={setCustomModalVisible}
        active={value}
        setData={changeValue}
        options={options}
      />
      <SelectIcon
        className={classNames(styles.selectIcon, {
          [styles.selectIconActive]: customModalVisible[name],
        })}
      />
    </div>
  );
}

export default CustomFormSelect;
