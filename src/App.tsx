import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Table from './components/table/Table';
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
