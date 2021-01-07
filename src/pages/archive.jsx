import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const groups = data.allMarkdownRemark.group;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Blog"
          description="Blog posts on joshghent.com - covering an array of topics from technical tutorials, stories and advice to productivity in Todoist and automation"
          keywords={['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs', 'todoist', 'productivity', 'developers', 'software', 'engineering', 'software engineering', 'automation', 'terraform', 'twitter']}
        />
        {groups.map((group) => {
          const posts = group.edges;
          const date = group.edges[0].node.frontmatter.date;

          const postsMap = posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small><span role="img" aria-label="coffee">☕</span> {node.fields.readingTime.text}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            );
          })

          return (
            <>
              <div key={{ date }}>{{ date }}</div>
              { { postsMap }}
            </>
          )
        })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___date) {
        edges {
          node {
            excerpt
            fields {
              slug
              readingTime {
                text
              }
            }
            frontmatter {
              date(formatString: "MMMM YYYY")
              title
              description
            }
          }
        }
      }
    }
  }
`;
