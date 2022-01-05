import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SignupForm from '../components/signup-form';

class HomeIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Developer Musings | Josh Ghent"
          keywords={data.site.siteMetadata.defaultTags}
        />
        <section id="hello-world">
          <h2>Hello World</h2>
          <p>I&apos;m Josh - engineer, maker and aspiring writer</p>
          <p>Created: Turbo Technologies (Consultancy Firm) / <a href="https://turboapi.dev">TurboAPI</a> / <a href="https://place.dog">PlaceDog</a> / and more</p>
          <p>Is: Language Agnostic / Vegetarian / Minimalist</p>
          <p>Latest: <Link to="/now">what I'm doing</Link></p>
          <p>Purpose: this blog is a <a href="https://fortelabs.co/blog/basboverview/">second brain</a>.</p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >
            <li>letters - <a href="mailto:me@joshghent.com">me@joshghent.com</a></li>
            <li>code - <a href="https://github.com/joshghent">joshghent</a></li>
            <li>snark - <a href="https://twitter.com/joshghent">@joshghent</a></li>
            <li>work - <a href="https://docs.google.com/document/d/1BHEsryVDOnFv-XDYjLKrVFC2TCNgqHr9KLVM9Vul-9Y/export?format=pdf">resume.pdf</a></li>
          </ul>
        </section>

        {/* <section id="projects">
          <h2>Projects</h2>
          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >
            <li>
              <a href="https://turboapi.dev">TurboAPI</a> <br />
              I created TurboAPI after facing problems constantly rebuilding custom end-to-end monitoring and API performance tracking tools. This tool helps customers track their end-to-end application and API performance over time. These insights help them bring faster experiences to their customers to increase conversions.
            </li>
            <li>
              <a href="https://place.dog">PlaceDog</a> <br />
              A simple service to get cute dogs as placeholders for your websites and designs. Just add a width and height to the end of the url.
            </li>
            <li>
              <a href="https://timberseed.com">Timberseed</a> <br />
              Wordpress website for a recruitment company based in London.
            </li>
            <li>
              <a href="https://github.com/joshghent/lastfm-slack">LastFM 2 Slack</a> <br />
              Docker bot for posting your currently scrobbled LastFm track as your Slack Status
            </li>
          </ul>
        </section> */}

        <section id="posts">
          {/* <h2>Latest Posts</h2>

          <ul style={{
            listStyleType: 'none',
            marginRight: 0,
          }}
          >

            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <li key={node.fields.slug}>
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul> */}

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
