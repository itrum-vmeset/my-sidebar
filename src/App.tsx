import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import {menuItems} from './helpers/helpers'
import styles from './App.module.css'
import AppRouter from './components/AppRouter';

function App() {
  
  return (
    <div className={styles.wrapper}>
      <Sidebar menuItems={menuItems} />
      <AppRouter />
    </div>
  );
}

export default App;
