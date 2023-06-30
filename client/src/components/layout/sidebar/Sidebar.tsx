import { memo } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import { SidebarProps } from "./Sidebar.props";

import styles from "./Sidebar.module.css";

function Sidebar({
  menuItems,
  className,
  ...props
}: SidebarProps): JSX.Element {
  const location = useLocation();

  return (
    <nav className={classNames(styles.sidebar, className)} {...props}>
      <ul>
        {menuItems.map(({ title, route, icon, id }) => (
          <Link
            className={classNames(
              route === location.pathname ? styles.selectedMenuItem : "",
              styles.menuItem
            )}
            key={id}
            data-testid={route}
            to={route}
          >
            {icon}
            <span>{title}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Sidebar);
