import { Link } from 'gatsby';
import React from 'react';
import { rhythm } from '../utils/typography';
import HCard from './hcard';

class Layout extends React.Component {
  render() {
    const { title, children } = this.props;
    const header = (
      <h1
        style={{
          marginBottom: 0,
          marginTop: 0,
          fontSize: '1.25em',
          width: '40%'
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
        <HCard />
        <div style={{ borderBottom: '1px #f5f5f5 solid', marginBottom: '2.5rem' }}>
          <header
            className="header"
            style={{
              maxWidth: rhythm(48),
              padding: `${rhythm(1.25)} ${rhythm(3 / 4)}`,
              margin: '0 auto',
            }}
          >
            <div className="wide-container">{header}
              <nav className="nav">
                <ul style={{ listStyle: 'none', display: 'inline' }}>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/bookshelf">Bookshelf</Link></li>
                  <li><Link to="/archive">Archive</Link></li>
                  <li><Link to="/now">About me</Link></li>
                  <li><Link to="/work">Work with me</Link></li>
                </ul>
              </nav>
            </div>
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
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            }}
          >
            <main className="container">{children}</main>
            <footer style={{ textAlign: 'center' }}>
              © {new Date().getFullYear()} - <Link to="/" className="u-url p-name">Josh Ghent</Link> - <a href="https://creativecommons.org/licenses/by-sa/4.0/">cc-by-sa</a> - <a href="https://github.com/joshghent/blog">View source</a>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
