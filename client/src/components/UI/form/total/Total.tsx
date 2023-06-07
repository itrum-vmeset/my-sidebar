import { priceRu } from "../../../../helpers/priceRu";
import { Typography } from "../../typography/Typography";

import { TotalProps } from "./Total.props";

import styles from "./Total.module.css";

function Total({ value }: TotalProps): JSX.Element {
  return (
    <div className={styles.total}>
      <Typography className={styles.totalTypography}>Итого:</Typography>
      <Typography className={styles.totalTypography}>
        {priceRu(value)}
      </Typography>
    </div>
  );
}

export default Total;
