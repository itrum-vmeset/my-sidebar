import { useState } from "react";

import { IProductMock, Tag } from "../../../models/IProductMockData";
import { Input } from "../input/Input";
import { Typography } from "../typography/Typography";

import styles from "./TagsInput.module.css";

interface TagsInputProps {
  data: IProductMock;
  setData: (selectedCategory: IProductMock) => void;
}

const TagsInput = ({ data, setData }: TagsInputProps): JSX.Element => {
  const [newTag, setNewTag] = useState("");

  const removeTag = (id: string | number): void => {
    setData({ ...data, tags: data.tags.filter((tag: any) => tag.id !== id) });
    // setTags([...tags.filter((tag) => tag.id !== id)]);
  };
  const addTag = (tag: string): void => {
    if (data.tags.length > 120) {
      alert("Максимум 120 тегов");
    }
    if (tag !== "" && data.tags.length < 121) {
      // setTags([...tags, event.target.value]);
      setData({ ...data, tags: [...data.tags, { id: Date.now(), name: tag }] });
    }
  };

  const keyHandler = () => {
    addTag(newTag);
    setNewTag("");
  };

  return (
    <div>
      <div className={styles.tagsInput}>
        <ul className={styles.tags}>
          {data?.tags.map((tag: Tag) => (
            <li key={tag.id} className={styles.tag}>
              <span className={styles.tagTitle}>{tag.name}</span>
              <span
                className={styles.tagCloseIcon}
                onClick={() => removeTag(tag.id)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyUp={(event) => (event.key === "Enter" ? keyHandler() : null)}
          className={styles.input}
        />
      </div>
      <Typography sizer="s">Максимум 120 тэгов</Typography>
    </div>
  );
};

export default TagsInput;
