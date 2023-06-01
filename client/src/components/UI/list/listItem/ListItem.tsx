import { useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import { ReactComponent as DeleteIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";

import { ListItemProps } from "./ListItem.props";

import styles from "./ListItem.module.css";

export const ListItem = ({
  className,
  item,
  category,
  setCategory,
  updateCategory,
  deleteCategory,
  selected,
  setSelected,
  setActiveElement,
  ...props
}: ListItemProps): JSX.Element => {
  const [editMode, seteditMode] = useState(false);
  const [active, setActive] = useState(item.name);
  const { pathname } = useLocation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") {
      updateCategory({ ...item, name: active });
      seteditMode(false);
      setSelected(null);
    }
    if (e.key === "Escape") {
      setActive(item.name);
      seteditMode(false);
      setSelected(null);
    }
  };

  return (
    <li
      key={item.id}
      className={classNames(styles.listItem, className, {
        [styles.listItemActive]: item.id == category,
      })}
      {...props}
    >
      <Typography
        className={classNames(styles.itemName, {
          [styles.listItemActive]: item.id == category,
        })}
        onClick={() => {
          setCategory(item.id);
          setActiveElement(item);
        }}
      >
        {selected === item.id ? (
          <Input
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className={styles.input}
            autoFocus
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span>{item.name}</span>
        )}
      </Typography>
      <EditIcon
        className={styles.editIcon}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(selected === item.id ? null : item.id);
          setCategory(item.id);
          seteditMode(!editMode);
        }}
      />
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={() => deleteCategory(item.id)}
      />
    </li>
  );
};
