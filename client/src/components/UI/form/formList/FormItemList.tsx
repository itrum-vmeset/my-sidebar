import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as DeleteIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as OkIcon } from "../../../../assets/icons/ok.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search.svg";
import { PROMOCODE_ROUTE, PROTOCOLS_ROUTE } from "../../../../helpers/consts";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";

import { FormItemListProps } from "./FormItemList.props";

import styles from "./FormList.module.css";

function FormItemList({ value, onChange }: FormItemListProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const { pathname } = useLocation();
  const filter = () => {
    const filtered = value.filter((product: any) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedProducts(filtered);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") {
      filter();
    }
  };

  useEffect(() => {
    setSearchedProducts(value);
  }, [value]);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {searchedProducts &&
          searchedProducts.map((el: any) => {
            return (
              <li key={el.id} className={styles.listItem}>
                <div className={styles.itemName}>{el.name.split(",", 1)}</div>
                <div className={styles.itemBrand}>
                  {el.brand.name.split(" ", 1)}
                </div>
                <DeleteIcon
                  className={styles.itemDeleteIcon}
                  onClick={() =>
                    onChange(value.filter((item: any) => item.id !== el.id))
                  }
                />
              </li>
            );
          })}
      </ul>
      {(value?.length && pathname === PROTOCOLS_ROUTE) ||
      pathname === PROMOCODE_ROUTE ? (
        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <Input
            placeholder="Поиск по товарам"
            className={styles.searchInput}
            type="text"
            value={query || ""}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <OkIcon className={styles.okIcon} onClick={filter} />
          <DeleteIcon className={styles.searchDeleteIcon} />
        </div>
      ) : null}
      <Button className={styles.formButton}>+ Добавить товар</Button>
    </div>
  );
}

export default FormItemList;
