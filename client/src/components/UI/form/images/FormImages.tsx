import { useState } from "react";

import { ReactComponent as AttachIcon } from "../../../../assets/icons/attach.svg";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";
import ImgLinkRow from "../imgLinkRow/ImgLinkRow";

import { FormImagesProps } from "./FormImages.props";

import styles from "./FormImages.module.css";

function FormImages({ value, onChange }: FormImagesProps): JSX.Element {
  const [newLink, setNewLink] = useState("");
  const addLink = (): void => {
    if (value.length > 4) {
      return alert("Не больше пяти изображений");
    }
    if (newLink !== "") {
      onChange([...value, newLink]);
      setNewLink("");
    }
  };
  const removeLink = (link: string): void => {
    onChange(
      value.filter((el: string) => {
        return el !== link;
      })
    );
  };
  return (
    <div className="images">
      <Typography>Изображения*</Typography>
      {value.length ? (
        value.map((item: string, index: number) => {
          return (
            <ImgLinkRow
              key={index}
              link={item}
              removeLink={() => removeLink(item)}
            />
          );
        })
      ) : (
        <></>
      )}
      <Input
        placeholder="Вставте ссылку на Google Drive"
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        onKeyUp={(event) => (event.key === "Enter" ? addLink() : null)}
      />
      <AttachIcon className={styles.inputFile} onClick={addLink} />
      <Typography sizer="s" style={{ marginTop: "-20px" }}>
        Максимум 5 изображений
      </Typography>
      <Typography sizer="s">Размер фото 1000x1000 px PNG, JPG, JPEG</Typography>
    </div>
  );
}

export default FormImages;
