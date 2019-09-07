// sidebar.js

import React from 'react';
import 'typeface-roboto';
import { bubble as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      <a className="menu-item">
        Home
      </a>

      <a className="menu-item" href="/page1">
        Page 1
      </a>

      <a className="menu-item" href="/page2">
        Page 2
      </a>
    </Menu>

  );
};

// function Home() {
//   return (
//     <div id="App">
//       <SideBar />
//       <div id="page-wrap">
//         <h1>AppDividend</h1>
//         <h2>Check out our tutorials the side menubar</h2>
//       </div>
//     </div>
//   );
// }
