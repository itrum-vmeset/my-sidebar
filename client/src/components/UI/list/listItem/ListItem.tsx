import { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import { ReactComponent as ClipIcon } from "../../../../assets/icons/clip.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as ImgIcon } from "../../../../assets/icons/img.svg";
import { ReactComponent as OkIcon } from "../../../../assets/icons/ok.svg";
import { BRANDS_ROUTE } from "../../../../helpers/consts";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";

import { ListItemProps } from "./ListItem.props";

import styles from "./ListItem.module.css";

export const ListItem = <T,>({
  className,
  item,
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
}: ListItemProps<T>): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [active, setActive] = useState(item.name);
  const { pathname } = useLocation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") {
      updateCategory({ ...item, name: active });
      setEditMode(false);
      setSelected(null);
    }
    if (e.key === "Escape") {
      setActive(item.name);
      setEditMode(false);
      setSelected(null);
    }
  };

  useEffect(() => {
    if (selected !== item?.id) {
      setEditMode(false);
    }
  }, [selected]);

  return (
    <li
      data-testid="listItem"
      key={item.id}
      className={classNames(styles.listItem, className, {
        [styles.listItemActive]: item.id == category,
        [styles.brandItem]: pathname === BRANDS_ROUTE,
      })}
      {...props}
      onClick={() => {
        setCategory && setCategory(item);
        setActiveElement(item);
        setFormVisible && setFormVisible(true);
      }}
    >
      {pathname === BRANDS_ROUTE && (
        <div className={styles.imgIcon}>
          {editMode ? <ClipIcon /> : <ImgIcon />}
        </div>
      )}
      <Typography
        className={classNames(styles.itemName, {
          [styles.listItemActive]: item.id == category,
          [styles.brandItemName]: pathname === BRANDS_ROUTE,
        })}
      >
        {editMode ? (
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
          <span data-testid="rowTitle">{item.name}</span>
        )}
      </Typography>
      {editMode ? (
        <>
          <div
            className="actionIconWrapper"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(selected === item.id ? null : item.id);
              setCategory && setCategory(item);
              updateCategory({ ...item, name: active });
              setEditMode(false);
            }}
          >
            <OkIcon className={styles.editIcon} data-testid="confirmIcon" />
          </div>
          <div
            className="actionIconWrapper"
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(false);
              setSelected(selected === item.id ? null : item.id);
            }}
          >
            <CloseIcon className={styles.deleteIcon} data-testid="closeIcon" />
          </div>
        </>
      ) : (
        <>
          <div
            className="actionIconWrapper"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(selected === item.id ? null : item.id);
              setCategory && setCategory(item);
              setEditMode(!editMode);
            }}
          >
            <EditIcon className={styles.editIcon} data-testid="editIcon" />
          </div>

          <div
            className="actionIconWrapper"
            onClick={(e) => {
              e.stopPropagation();
              setActiveElement(item);
              setModalVisible(true);
            }}
          >
            <DeleteIcon className={styles.deleteIcon} data-testid="delIcon" />
          </div>
        </>
      )}
    </li>
  );
};
