import classNames from "classnames";

import { ReactComponent as SelectIcon } from "../../../../assets/icons/select.svg";
import { translator } from "../../../../helpers/translator";
import { Input } from "../../input/Input";
import SelectModal from "../../selectModal/SelectModal";

import { CategoriesSelectProps } from "./CategoriesSelect.props";

import styles from "./CustomSelect.module.css";

function CategoriesSelect({
  data,
  setData,
  selectModalVisible,
  setSelectModalVisible,
  options,
}: CategoriesSelectProps): JSX.Element {
  return (
    <div className={styles.customSelect}>
      <Input
        className={styles.selectInput}
        value={translator(data, "") || data}
        onClick={(e) => {
          e.stopPropagation();
          setSelectModalVisible(!selectModalVisible);
        }}
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
        onClick={(e) => {
          e.stopPropagation();
          setSelectModalVisible(!selectModalVisible);
        }}
      />
    </div>
  );
}

export default CategoriesSelect;
