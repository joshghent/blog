import { Link } from 'gatsby';
import React from 'react';
import { rhythm, scale } from '../utils/typography';


class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    header = (
      <h1
        style={{
          marginBottom: 0,
          marginTop: 0,
          fontSize: "1.25em"
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
    return (
      <>
        <div style={{ borderBottom: "1px #f5f5f5 solid", marginBottom: '2.5rem', }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(48),
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`
            }}
          >{header}
            <nav className="nav">
              <ul style={{ listStyle: "none", display: "inline" }}>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/archive">Archive</Link></li>
                <li><Link to="/now">Now</Link></li>
              </ul>
            </nav>
          </header>
        </div>
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
              maxWidth: rhythm(48),
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`
            }}
          >
            <main className="container">{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built by <a href="https://joshghent.com">Josh Ghent</a>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
