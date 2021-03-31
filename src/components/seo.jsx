/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import SchemaOrg from './schema';

function SEO({
  description, lang, meta, keywords, title, pathname, date, isBlogPost,
}) {
  const { site } = useStaticQuery(
    graphql`
                  query {
                    site {
                      siteMetadata {
                        title
                        description
                        author,
                        social {
                          twitter
                          email
                        }
                        siteUrl
                      }
                    }
                  }
                `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : site.siteMetadata.siteUrl;

  const author = {
    name: site.siteMetadata.author,
    email: site.siteMetadata.social.email,
  };

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        defer={false}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(title
          ? {
            titleTemplate: `%s — ${site.siteMetadata.title}`,
            title,
          }
          : {
            title: `${site.siteMetadata.title}`,
          })
        }
        defaultTitle={`${site.siteMetadata.title}`}
        link={
          canonical
            ? [
              {
                rel: 'canonical',
                href: canonical,
              },
            ]
            : []
        }
        meta={[
          {
            name: 'description',
            content: metaDescription,
          },
          {
            property: 'title',
            content: title,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            name: 'og:url',
            content: site.siteMetadata.siteUrl,
          },
          {
            property: 'og:description',
            content: metaDescription,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'twitter:summary_large_image',
            content: 'summary',
          },
          {
            name: 'twitter:creator',
            content: `@${site.siteMetadata.social.twitter}`,
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:url',
            content: site.siteMetadata.siteUrl,
          },
          {
            name: 'twitter:description',
            content: metaDescription,
          },
        ]
          .concat(
            keywords.length > 0
              ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
              : [],
          )
          .concat(meta)}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={canonical}
        title={title}
        description={metaDescription}
        canonicalUrl={site.siteMetadata.siteUrl}
        author={author}
        defaultTitle={title}
        datePublished={date}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

export default SEO;
