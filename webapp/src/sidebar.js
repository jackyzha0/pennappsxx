// sidebar.js

import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import page1 from './page1.js';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/page1.js">
        Page 1
      </a>

      <a className="menu-item" href="/angular">
        Page 2
      </a>
    </Menu>
  );
};
