import classNames from "classnames";

import { ReactComponent as SelectIcon } from "../../../../assets/icons/select.svg";
import { Input } from "../../input/Input";
import SelectModal from "../../selectModal/SelectModal";

import { CustomFormSelectProps } from "./CustomFormSelect.props";

import styles from "./CustomSelect.module.css";

function CustomFormSelect({
  value,
  onChange,
  customModalVisible,
  setCustomModalVisible,
  setCategoryModalVisible,
  setSubCategoryModalVisible,
  options,
}: CustomFormSelectProps): JSX.Element {
  return (
    <div className={styles.customSelect}>
      <Input
        className={styles.selectInput}
        value={value.name || ""}
        onClick={(e) => {
          e.stopPropagation();
          setCustomModalVisible(!customModalVisible);
          setCategoryModalVisible(false);
          setSubCategoryModalVisible(false);
        }}
        onChange={() => null}
      />
      <SelectModal
        selectModalVisible={customModalVisible}
        setSelectModalVisible={setCustomModalVisible}
        active={value}
        setData={onChange}
        options={options}
      />
      <SelectIcon
        className={classNames(styles.selectIcon, {
          [styles.selectIconActive]: customModalVisible,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setCustomModalVisible(!customModalVisible);
          setCategoryModalVisible(false);
          setSubCategoryModalVisible(false);
        }}
      />
    </div>
  );
}

export default CustomFormSelect;
