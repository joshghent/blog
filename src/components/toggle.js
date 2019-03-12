import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Toggle from 'react-toggle'

import "react-toggle/style.css"
import moon from "../../content/assets/moon.png"
import sun from "../../content/assets/sun.png"

export default class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <Toggle
            checked={theme === "dark"}
            name="theme"
            value="dark"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            icons={{
              checked: <img
                      src={moon}
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />,
              unchecked: <img
                      src={sun}
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />,
            }}
            />
            /* <div
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
              className="toggle"
            >
              <input type="checkbox" className="toggle-checkbox" />
              <div className="toggle-track">
                <div className="toggle-track-check">
                  <img
                      src={moon}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                </div>
                <div className="toggle-track-unchecked">
                  <img
                      src={sun}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: 'none' }}
                    />
                </div>
              </div>
            </div> */
        )}
      </ThemeToggler>
    )
  }
}
