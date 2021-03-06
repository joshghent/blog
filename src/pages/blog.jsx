import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SignupForm from '../components/signup-form';

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={location} title={`Blog | ${siteTitle}`}>
        <SEO
          title="Blog"
          description="The latest blog post on JoshGhent.com"
          keywords={data.site.siteMetadata.defaultTags}
          pathname={posts[0].node.fields.slug}
          date={posts[0].node.frontmatter.date}
          isBlogPost="true"
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h1 className="blogPostTitle p-name">
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h1>
              <section className="e-content" dangerouslySetInnerHTML={{ __html: node.html }} style={{ fontSize: '18px' }} />
            </div>
          );
        })}

        <SignupForm />

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
