import React from "react";
import classNames from "classnames";

import { NavigatorProps } from "./Navigator.props";

import styles from "./Navigator.module.css";

function Navigator({ navItems, setActiveRoute, activeRoute }: NavigatorProps) {
  return (
    <nav>
      <ul className={styles.navList}>
        {navItems.map(({ title, id, value }) => (
          <li
            className={classNames(
              value === activeRoute ? styles.selectedListItem : "",
              styles.listItem
            )}
            key={id}
            onClick={() => setActiveRoute(value)}
          >
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigator;
