/* eslint-disable jsx-a11y/anchor-has-content */
import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    let groups = data.allMarkdownRemark.group.slice(0);

    // Stupid logic to figure out if we should sort
    // For some reason when you navigate to the page, it sorts the data correctly
    // If you click the archive in the nav tho then it has it cached sorted so then it undoes the sort
    if (Number(groups[0].edges[0].node.frontmatter.date.split(' ')[2]) < Number(groups[groups.length - 1].edges[0].node.frontmatter.date.split(' ')[2])) {
      groups = groups.reverse();
    }

    return (
      <Layout location={location} title={`Archive | ${siteTitle}`}>
        <SEO
          title="Archive"
          description="Archive of all posts on JoshGhent.com"
          keywords={data.site.siteMetadata.defaultTags}
        />
        {groups.map((group) => {
          const posts = group.edges.sort((a, b) => Number(b.node.frontmatter.date.split(' ')[0]) - Number(a.node.frontmatter.date.split(' ')[0]));
          const dateField = group.edges[0].node.frontmatter.date;
          const date = `${dateField.split(' ')[1]} ${dateField.split(' ')[2]}`;

          return (
            <div style={{ textAlign: 'center' }}>
              <a id={date} href={`#${date}`} />
              <div className="archiveGroupHeader" key={date}>{date}</div>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                  <div key={node.fields.slug}>
                    <p
                      style={{
                        textAlign: 'left',
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <span>{node.frontmatter.date.split(' ')[0]} </span>
                      <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                        {title}
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>
          );
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
    allMarkdownRemark(filter: {
          frontmatter: {
            date: { ne: null }
          }
        }) {
      group(field: fields___year_month) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "DD MMMM YYYY")
              title
            }
          }
        }
      }
    }
  }
`;
