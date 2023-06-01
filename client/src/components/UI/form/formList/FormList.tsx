import { useMemo, useState } from "react";
import classNames from "classnames";

import { ReactComponent as DeleteIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as OkIcon } from "../../../../assets/icons/ok.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search.svg";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";
import FormRow from "../formRow/FormRow";

import { FormListProps } from "./FormList.props";

import styles from "./FormList.module.css";

function FormList({ data, setData }: FormListProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(data.products);
  const filter = () => {
    const filtered = data.products.filter((product: any) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedProducts(filtered);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === "Enter") {
      filter();
    }
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {searchedProducts.map((el: any) => {
          return (
            <li key={el.id} className={styles.listItem}>
              <div className={styles.itemName}>{el.name.split(",", 1)}</div>
              <div className={styles.itemBrand}>
                {el.brand.name.split(" ", 1)}
              </div>
              <DeleteIcon className={styles.itemDeleteIcon} />
            </li>
          );
        })}
      </ul>
      {data.products.length ? (
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
      <Button
        className={classNames(styles.formButton, {
          [styles.disabledBtn]: !data.name || !data.brand,
        })}
        // disabled
      >
        + Добавить товар
      </Button>
    </div>
  );
}

export default FormList;
