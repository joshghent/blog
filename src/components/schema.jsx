import React from 'react';
import Helmet from 'react-helmet';

function SchemaOrg({
  author,
  canonicalUrl,
  datePublished,
  defaultTitle,
  description,
  isBlogPost,
  title,
  url,
}) {
  const baseSchema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: defaultTitle,
      logo: 'https://joshghent.com/images/logo.png',
      publisher: {
        '@type': 'Person',
        name: 'Josh Ghent',
      },
    },
  ];

  const schema = isBlogPost
    ? [
      ...baseSchema,
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url,
        name: title,
        alternateName: defaultTitle,
        headline: title,
        description,
        author: {
          '@type': 'Person',
          name: author.name,
          email: author.email,
        },
        publisher: {
          '@type': 'Person',
          name: author.name,
        },
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': canonicalUrl,
        },
        datePublished,
      },
    ]
    : baseSchema;

  return (
    <Helmet>
      <script script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export default SchemaOrg;
