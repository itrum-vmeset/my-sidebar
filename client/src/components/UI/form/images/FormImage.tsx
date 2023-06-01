import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { ReactComponent as AttachIcon } from "../../../../assets/icons/attach.svg";
import { Input } from "../../input/Input";
import { Typography } from "../../typography/Typography";
import ImgLinkRow from "../imgLinkRow/ImgLinkRow";

import styles from "./FormImages.module.css";

interface FormImageProps {
  data: any;
  setData: any;
}

function FormImage({ data, setData }: FormImageProps): JSX.Element {
  const [newLink, setNewLink] = useState("");

  const addLink = (): void => {
    if (newLink !== "") {
      setData({ ...data, images: [...data.images, newLink] });
      setNewLink("");
    }
  };
  const removeLink = (link: string): void => {
    setData({
      ...data,
      images: data.images.filter((el: string) => el !== link),
    });
  };
  return (
    <div className="images">
      {/* <Typography>Изображения*</Typography>
      {data.images.length ? (
        data.images.map((item: string, index: React.Key | null | undefined) => {
          return <ImgLinkRow key={index} link={item} removeLink={removeLink} />;
        })
      ) : (
        <></>
      )} */}
      <Input
        placeholder="Вставте ссылку на Google Drive"
        className="inputFile"
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        onKeyUp={(event) => (event.key === "Enter" ? addLink() : null)}
      />
      <AttachIcon className={styles.inputFile} onClick={addLink} />
      {/* <Typography sizer="s" style={{ marginTop: "-20px" }}>
        Максимум 5 изображений
      </Typography> */}
      <Typography sizer="s">Размер фото 750x730 px PNG, JPG, JPEG</Typography>
    </div>
  );
}

export default FormImage;
