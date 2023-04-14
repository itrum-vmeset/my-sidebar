import classNames from "classnames";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";

function Sidebar ({ menuItems, className, ...props }: SidebarProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className={classNames(styles.sidebar, className)}
      {...props}
    >
      <ul>
        {menuItems.map(({ title, route, icon, id }) => (
          <li
            className={classNames(route === location.pathname ? styles.selectedMenuItem : '', styles.menuItem)}
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

export default Sidebar;