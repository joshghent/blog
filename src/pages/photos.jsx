/* eslint-disable jsx-a11y/anchor-has-content */
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

class Photos extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={`${siteTitle}`}>
        <SEO
          title="Photos"
          description="Photos I have taken"
          keywords={data.site.siteMetadata.defaultTags}
        />
        {/* {photos.map((photo) => (
          <figure id="">
            <a href="">
              <img src="" loading="lazy" alt=""/>
            </a>
            <figcaption>
              <span className="photo__metadata">{{}}</span>
            </figcaption>
            </figure>
          ))} */}
      </Layout>
    );
  }
}

export default Photos;

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
