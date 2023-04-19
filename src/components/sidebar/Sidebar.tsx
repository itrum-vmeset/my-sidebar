import React, { memo } from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import { SidebarProps } from "./Sidebar.props";

import styles from "./Sidebar.module.css";

function Sidebar({
  menuItems,
  className,
  ...props
}: SidebarProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={classNames(styles.sidebar, className)} {...props}>
      <ul>
        {menuItems.map(({ title, route, icon, id }) => (
          <li
            className={classNames(
              route === location.pathname ? styles.selectedMenuItem : "",
              styles.menuItem
            )}
            key={id}
            onClick={() => navigate(route)}
          >
            {icon}
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Sidebar);
