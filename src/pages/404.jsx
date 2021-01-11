import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

class NotFoundPage extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="404: Not Found" description="This page could not be found on joshghent.com" />
        <h1>Not Found</h1>
        <p>You took a wrong turn and wound up here! <Link to="/">Click here to head home.</Link></p>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
