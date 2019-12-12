import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import Toggle from 'react-toggle';

import 'react-toggle/style.css';
import moon from '../../content/assets/moon.png';
import sun from '../../content/assets/sun.png';

export default class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <Toggle
            checked={theme === 'dark'}
            name="theme"
            value="dark"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            icons={{
              checked: <img
                src={moon}
                role="presentation"
                alt="moon"
                style={{ pointerEvents: 'none' }}
              />,
              unchecked: <img
                src={sun}
                role="presentation"
                alt="sun"
                style={{ pointerEvents: 'none' }}
              />,
            }}
          />
        )}
      </ThemeToggler>
    );
  }
}
