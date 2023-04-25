import React from "react";

import AppRouter from "./components/AppRouter";

import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <AppRouter />
    </div>
  );
}

export default App;
