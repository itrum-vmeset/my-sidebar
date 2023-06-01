import React from "react";

import { ReactComponent as DelIcon } from "../../../../assets/icons/del.svg";
import { ReactComponent as ImgIcon } from "../../../../assets/icons/img.svg";
import { Typography } from "../../typography/Typography";

import styles from "./ImgLinkRow.module.css";

interface ImgLinkRowProps {
  removeLink: (link: string) => void;
  link: string;
}

function ImgLinkRow({ link, removeLink }: ImgLinkRowProps): JSX.Element {
  return (
    <div className={styles.row}>
      <div className={styles.imgBlock}>
        <ImgIcon />
      </div>
      <Typography className={styles.link}>{link}</Typography>
      <DelIcon onClick={() => removeLink(link)} />
    </div>
  );
}

export default ImgLinkRow;
