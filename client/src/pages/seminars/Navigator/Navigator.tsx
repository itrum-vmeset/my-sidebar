import classNames from "classnames";

import { NavigatorProps } from "./Navigator.props";

import styles from "./Navigator.module.css";

function Navigator({
  navItems,
  setActiveRoute,
  activeRoute,
}: NavigatorProps): JSX.Element {
  return (
    <nav>
      <ul className={styles.navList}>
        {navItems.map(({ title, id, value }) => (
          <li
            data-testid="navItem"
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
