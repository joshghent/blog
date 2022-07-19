import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Developer Musings | Josh Ghent"
          keywords={data.site.siteMetadata.defaultTags}
        />
        <section id="hello-world">
          <h2>Hello World</h2>
          <p>I&apos;m Josh - engineer, maker and aspiring writer</p>
          <p>created - <Link to="/work">Turbo Technologies (consultancy firm)</Link> / <a href="https://turboapi.dev">TurboAPI</a> / <a href="https://place.dog">PlaceDog</a></p>
          <p>latest - <Link to="/now">what I&apos;m doing</Link></p>
          <p>purpose - this blog is a <a href="https://fortelabs.co/blog/basboverview/">second brain</a>.</p>
        </section>

        <section id="contact" style={{ marginTop: '3rem'}}>
          <h2>Contact</h2>
          <ul style={{
            listStyleType: 'none',
            marginLeft: 0,
          }}
          >
            <li>letters - <a href="mailto:me@joshghent.com">me@joshghent.com</a></li>
            <li>code - <a href="https://github.com/joshghent">joshghent</a></li>
            <li>snark - <a href="https://twitter.com/joshghent">@joshghent</a></li>
            <li>work - <a href="https://docs.google.com/document/d/1BHEsryVDOnFv-XDYjLKrVFC2TCNgqHr9KLVM9Vul-9Y/export?format=pdf">resume.pdf</a></li>
          </ul>
        </section>

        <section id="posts">

          <div style={{ textAlign: 'center' }}><Link style={{ fontSize: '1.25em' }} to="/archive">See All Posts</Link></div>
        </section>

        <p style={{ textAlign: 'left', fontFamily: 'monospace' }}>:wq</p>
      </Layout>
    );
  }
}

export default HomeIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }`;
