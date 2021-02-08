import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const { data, location, pageContext } = this.props;
    const post = data.markdownRemark;
    const siteTitle = data.site.siteMetadata.title;
    const { previous, next } = pageContext;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          keywords={post.frontmatter.tags || ['blog', 'gatsby', 'javascript', 'react', 'josh', 'ghent', 'josh ghent', 'leicesterjs', 'todoist', 'productivity', 'developers', 'software', 'engineering', 'software engineering', 'automation', 'terraform', 'twitter']}
        />
        <section className="h-entry">
          <time className="dt-published" dateTime={post.frontmatter.date} style={{ display: 'none' }}>{post.frontmatter.date}</time>
          <a href={`${data.site.siteMetadata.siteUrl}/${post.fields.slug}`} className="u-url" style={{ display: 'none' }}>Link to this Article</a>
          <p className="p-summary" style={{ display: 'none' }}>{post.frontmatter.description}</p>
          <h1 className="blogPostTitle p-name">{post.frontmatter.title}</h1>
          <section className="e-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        <hr
          style={{
            marginBottom: rhythm(1.5),
            marginTop: rhythm(1.5),
          }}
        />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout >
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
      }
    }
  }
`;
