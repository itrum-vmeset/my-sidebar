import { useEffect, useState } from "react";
import classNames from "classnames";

import { ReactComponent as DeleteIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as OkIcon } from "../../../../assets/icons/ok.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search.svg";
import { Product } from "../../../../models/IResponse";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";

import { FormListProps } from "./FormList.props";

import styles from "./FormList.module.css";

function CustomFormList({ value, changeValue }: FormListProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([] as Product[]);
  const filter = () => {
    const filtered = value?.filter((product: Product) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
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
        {searchedProducts?.length
          ? searchedProducts.map((el: Product) => {
              return (
                <li key={el.id} className={styles.listItem}>
                  <div className={styles.itemName}>{el.name.split(",", 1)}</div>
                  <div className={styles.itemBrand}>
                    {el.brand.name.split(" ", 1)}
                  </div>
                  <DeleteIcon
                    className={styles.itemDeleteIcon}
                    onClick={() => {
                      changeValue(
                        value.filter((item: Product) => {
                          return item.id !== el.id;
                        })
                      );
                    }}
                  />
                </li>
              );
            })
          : ""}
      </ul>
      {value?.length ? (
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
          <DeleteIcon
            className={styles.searchDeleteIcon}
            onClick={() => {
              setQuery("");
              setSearchedProducts(value);
            }}
          />
        </div>
      ) : (
        ""
      )}
      <Button className={classNames(styles.formButton)}>
        + Добавить товар
      </Button>
    </div>
  );
}

export default CustomFormList;
