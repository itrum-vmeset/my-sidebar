import React from "react";

import AppRouter from "./components/AppRouter";
import Sidebar from "./components/sidebar/Sidebar";
import { menuItems } from "./helpers/helpers";

import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Sidebar menuItems={menuItems} />
      <AppRouter />
    </div>
  );
}

export default App;
