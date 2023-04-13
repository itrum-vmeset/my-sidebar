import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {menuItems} from './helpers/helpers'

function App() {

  return (
    <div className="App">
      <Sidebar menuItems={menuItems} />
    </div>
  );
}

export default App;
