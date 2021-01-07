/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        },
        company {
          url
          name
        }
      }
    }
  }
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author, social } = data.site.siteMetadata;
        return (
          <div
            style={{
              display: 'flex',
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: '100%',
              }}
              imgStyle={{
                borderRadius: '50%',
              }}
            />
            <p>
              I&apos;m <a href={`https://twitter.com/${social.twitter}`}><strong>{author}</strong></a>. I make robust apps for the web - currently building <a href="https://turboapi.dev">TurboAPI</a>, a simple application performance monitoring. I also co-organize <a href="https://midlandsjs.org">MidlandsJS</a>.
              {' '}
            </p>
          </div>
        );
      }}
    />
  );
}

export default Bio;
