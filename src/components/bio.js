/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Bio() {
	return (
		<StaticQuery
			query={bioQuery}
			render={data => {
				const { author, social, company } = data.site.siteMetadata
				return (
					<div
						style={{
							display: `flex`,
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
								borderRadius: `100%`,
							}}
							imgStyle={{
								borderRadius: `50%`,
							}}
						/>
						<p>
							I'm <a href={`https://twitter.com/${social.twitter}`}><strong>{author}</strong></a>. I make robust apps for the web. I wrangle code at <a href={company.url}>{company.name}</a>. I act as lead maintainer of ESFiddle and organize LeicesterJS
              {` `}
						</p>
					</div>
				)
			}}
		/>
	)
}

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
`

export default Bio
