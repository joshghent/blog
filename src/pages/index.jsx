import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { PhotoSlider } from '../components/photos-slider';

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
          <p>I&apos;m Josh - software engineer, maker and aspiring writer.</p>
          <p>Generally, I write about technical architecture, software culture and DevOps. This is my little corner of the internet where I post my writings, photos and things I have discovered on the net.</p>

          <p><Link to="/projects">projects</Link> · <Link to="/now">latest</Link> · <Link to="/bookshelf">bookshelf</Link></p>
          <p><a href="https://github.com/joshghent">github</a> · <a href="https://twitter.com/joshghent">twitter</a></p>
        </section>

        <hr className="section-break" />

        <section id="photos">
          <h2 className="text">Photos</h2>
          <Link to="/photos" className="styled-link">All Photos</Link>
          <a href="photos.xml" className="styled-link">RSS</a>

          <PhotoSlider limit={5}/>
        </section>

        <hr className="section-break" />

        <section id="posts">
          <h2 className="text">Posts</h2>
          <Link to="/archive" className="styled-link">All Posts</Link>
          <a href="rss.xml" className="styled-link">RSS</a>

           <ul style={{
             listStyleType: 'none',
             marginLeft: 0,
           }}
           >

             {posts.map(({ node }) => {
               const title = node.frontmatter.title || node.fields.slug;
               return (
                 <li key={node.fields.slug} className="post-preview">
                   <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                     {title}
                   </Link>
                 </li>
               );
             })}
           </ul>
        </section>

        {/* <hr className="section-break" />

        <section id="notes">
          <h2 className="text">Notes</h2>
          <Link to="/notes" className="styled-link">All Notes</Link>
          <a href="notes.xml" className="styled-link">RSS</a>
        </section> */}

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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {
      frontmatter: {
        date: { ne: null }
      }
    }, limit: 3) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
            description
          }
        }
      }
    }
  }`;
