import classNames from "classnames";
import { useLocation } from "react-router-dom";

import { NoRows } from "../../table/noRows/NoRows";

import { ListItem } from "./listItem/ListItem";
import { ListProps } from "./List.props";

import styles from "./List.module.css";

export const List = ({
  className,
  data,
  category,
  setCategory,
  updateCategory,
  deleteCategory,
  selected,
  setSelected,
  setActiveElement,
  setModalVisible,
  setFormVisible,
  ...props
}: ListProps): JSX.Element => {
  const { pathname } = useLocation();
  if (!data?.data?.length) {
    return <NoRows pathname={pathname} />;
  }
  return (
    <ul className={classNames(styles.list, className)} {...props}>
      {data?.data?.map((el: any) => {
        return (
          <ListItem
            className={styles.listItem}
            key={el.id}
            item={el}
            category={category}
            setCategory={setCategory}
            deleteCategory={deleteCategory}
            updateCategory={updateCategory}
            selected={selected}
            setSelected={setSelected}
            setActiveElement={setActiveElement}
            setModalVisible={setModalVisible}
            setFormVisible={setFormVisible}
          />
        );
      })}
    </ul>
  );
};
