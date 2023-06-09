import { useState } from "react";

import { Input } from "../input/Input";
import { Typography } from "../typography/Typography";

import { TagsInputProps } from "./TagsInput.props";

import styles from "./TagsInput.module.css";

interface ITag {
  id: string;
  name: string;
}

const TagsInput = ({ value, onChange }: TagsInputProps): JSX.Element => {
  const [newTag, setNewTag] = useState("");

  const removeTag = (id: string): void => {
    onChange(value.filter((tag: ITag) => tag.id !== id));
  };
  const addTag = (tag: string): void => {
    if (value?.length > 120) {
      return alert("Максимум 120 тегов");
    }
    if (tag !== "" && value.length < 121) {
      onChange([...value, { id: Date.now().toString(), name: tag }]);
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
          {value &&
            value?.map((tag: ITag) => (
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
