import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Blog"
          description="Blog posts on joshghent.com - covering an array of topics from technical tutorials, stories and advice to productivity in Todoist and automation"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs', 'todoist', 'productivity', 'developers', 'software', 'engineering', 'software engineering', 'automation', 'terraform', 'twitter']}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h2 className="blogPostTitle">
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: node.html }} style={{ fontSize: '18px' }} />
            </div>
          );
        })}

        <div style={{ textAlign: 'center' }}><Link style={{ fontSize: '1.5em' }} to="/archive">See All Posts</Link></div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
