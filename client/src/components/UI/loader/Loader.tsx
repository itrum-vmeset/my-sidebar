import classNames from "classnames";

import styles from "./Loader.module.css";

const Loader = ({ className }: any): JSX.Element => {
  return <div className={classNames(styles.loader, className)}></div>;
};

export default Loader;
