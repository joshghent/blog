import React from 'react';
import Helmet from 'react-helmet';

function SchemaOrg({
  author,
  canonicalUrl,
  datePublished,
  defaultTitle,
  description,
  image,
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
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
        author: {
          '@type': 'Person',
          name: author.name,
          email: author.email,
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
