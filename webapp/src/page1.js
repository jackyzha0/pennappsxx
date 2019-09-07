import React from 'react';
import SideBar from './sidebar';

import './App.css';

export default function App() {
  return (
    <div id="App">
      <SideBar />
      <div id="page-wrap">
        <h1>AppDividend</h1>
        <h2>Check out our tutorials the side menubar</h2>
      </div>
    </div>
  );
}
