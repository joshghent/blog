/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    let groups = data.groups.group.slice(0);

    // Stupid logic to figure out if we should sort
    // For some reason when you navigate to the page, it sorts the data correctly
    // If you click the archive in the nav tho then it has it cached sorted so then it undoes the sort
    if (Number(groups[0].edges[0].node.frontmatter.date.split(' ')[2]) < Number(groups[groups.length - 1].edges[0].node.frontmatter.date.split(' ')[2])) {
      groups = groups.reverse();
    }

    return (
      <Layout location={location} title={`${siteTitle}`}>
        <SEO
          title="Archive"
          description="Archive of all posts on JoshGhent.com"
          keywords={data.site.siteMetadata.defaultTags}
        />
        <ul style={{ display: 'none' }} className="h-feed">
          <h1 className="p-name site-title">{siteTitle}</h1>
          <p className="p-summary">Archive of all posts from joshghent.com</p>
          {data.posts.edges.map(({ node }) => (
              <li>
                <article className="h-entry">
                  <Link className="u-url" href={node.fields.slug}>
                    <h2 className="p-name">{node.frontmatter.title}</h2>
                  </Link>
                  <address className="p-author author h-card vcard">
                    <a href="https://joshghent.com" className="u-url url p-name fn" rel="author">Josh Ghent</a>
                  </address>
                  <span>
                    <time className="dt-published" dateTime={node.frontmatter.date}>
                      {node.frontmatter.date}
                    </time>
                  </span>
                  <p className="p-summary">{node.frontmatter.description}</p>
                </article>
              </li>
            ))}
        </ul>
        {groups.map((group) => {
          const posts = group.edges.sort((a, b) => Number(b.node.frontmatter.date.split(' ')[0]) - Number(a.node.frontmatter.date.split(' ')[0]));
          const dateField = group.edges[0].node.frontmatter.date;
          const date = `${dateField.split(' ')[1]} ${dateField.split(' ')[2]}`;

          return (
            <div style={{ textAlign: 'center' }}>
              <a id={date} href={`#${date}`} />
              <h2 className="archiveGroupHeader" key={date}>{date}</h2>
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
    groups: allMarkdownRemark(filter: {
          frontmatter: {
            date: { ne: null }
          }, fileAbsolutePath: {regex: "/^(?!.*(notes).*$)([^\n]*)/"}
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
  	posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {
      frontmatter: {
        date: { ne: null }
      }, fileAbsolutePath: {regex: "/^(?!.*(notes).*$)([^\n]*)/"}
    }) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
          }
        }
      }
    }
  }
`;
