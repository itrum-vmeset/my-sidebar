import { ReactComponent as DelIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as ImgIcon } from "../../../../assets/icons/img.svg";
import { Typography } from "../../typography/Typography";

import { ImgLinkRowProps } from "./ImgLinkRowProps.props";

import styles from "./ImgLinkRow.module.css";

function ImgLinkRow({ link, removeLink }: ImgLinkRowProps): JSX.Element {
  return (
    <div className={styles.row}>
      <div className={styles.imgBlock}>
        <ImgIcon />
      </div>
      <Typography className={styles.link}>
        {link ? link : "изображение отсутсвует"}
      </Typography>
      <DelIcon onClick={() => removeLink("")} />
    </div>
  );
}

export default ImgLinkRow;
