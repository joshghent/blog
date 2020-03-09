import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import ThemeToggle from './toggle';

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
          >
            {title}
          </Link>
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
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.625rem',
            }}
          >{header}
            <div className="nav">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/now">Now</Link></li>
            </div>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built by <a href="https://joshghent.com">Josh Ghent</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default Layout;
