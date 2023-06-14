import { useLocation } from "react-router-dom";

import { ReactComponent as AttachIcon } from "../../../../assets/icons/attach.svg";
import { SEMINARS_ROUTE } from "../../../../helpers/consts";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";
import ImgLinkRow from "../imgLinkRow/ImgLinkRow";

import { FormImageProps } from "./FormImage.props";

import styles from "./FormImage.module.css";

function FormImage({ value, changeValue }: FormImageProps): JSX.Element {
  const { pathname } = useLocation();
  return (
    <div>
      {value ? (
        <ImgLinkRow link={value} removeLink={changeValue} />
      ) : (
        <>
          <Input
            placeholder="Вставте ссылку на Google Drive"
            value={value}
            onChange={changeValue}
          />
          <AttachIcon className={styles.inputFile} onClick={changeValue} />
        </>
      )}
      <Typography sizer="s">
        {pathname === SEMINARS_ROUTE ? (
          <>Размер фото 750x730 px PNG, JPG, JPEG</>
        ) : (
          <>Размер баннера 576x320 px PNG, JPG, JPEG</>
        )}
      </Typography>
    </div>
  );
}

export default FormImage;
