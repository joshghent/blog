import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath || location.pathname !== 'blog') {
      header = (
        <h1
          style={{
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          />
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            ...scale(0.75),
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--textNormal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: `${rhythm(1)} ${rhythm(2 / 4)}`,
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >{header}
            <div className="nav">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/now">Now</Link></li>
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <div className="row">
              <div className="left">
                <p>You've reached the end. I'm not sure what you're looking for, but it's probably not here. Anyway, here is some meaningless copyright</p>
                <p>© {new Date().getFullYear()}, Built by <a href="https://joshghent.com">Josh Ghent</a></p>
              </div>
              <div className="right">
                <a href="https://twitter.com/joshghent">Twitter</a>
                <a href="mailto:me@joshghent.com?subject=Help I'm trapped in the footer!">Mail</a>
                <a href="https://linkedin.com/in/joshghent">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
