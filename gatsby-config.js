module.exports = {
	siteMetadata: {
		title: `Josh Ghent | Developer Musings`,
		author: `Josh Ghent`,
		company: {
			name: `Capp & Co`,
			url: `https://www.capp.co`
		},
		description: `Backend Developer, with an interest in application security and performance`,
		siteUrl: `https://joshghent.com`,
		social: {
			twitter: `joshghent`,
			linkedin: `https://www.linkedin.com/in/joshghent/`,
			github: `joshghent`
		},
	},
	plugins: [
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				// this base query will be merged with any queries in each feed
				query: `
					{
						site {
							siteMetadata {
								title
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.excerpt,
									date: edge.node.frontmatter.date,
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [{ "content:encoded": edge.node.html }],
								})
							})
						},
						query: `
							{
								allMarkdownRemark(
									limit: 1000,
									sort: { order: DESC, fields: [frontmatter___date] }
								) {
									edges {
										node {
											excerpt
											html
											fields { slug }
											frontmatter {
												title
												date
											}
										}
									}
								}
							}
						`,
						output: "/rss.xml",
						title: "Josh Ghent Blog RSS Feed",
					},
				],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-embed-gist",
						options: {
							// Optional:

							// the github handler whose gists are to be accessed
							username: 'joshghent',

							// a flag indicating whether the github default gist css should be included or not
							// default: true
							includeDefaultCss: true
						}
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					`gatsby-remark-reading-time`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: `UA-72778945-1`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Josh Ghent's Blog`,
				short_name: `JoshGhent`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/icon.png`,
			},
		},
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		'gatsby-plugin-catch-links',
		'gatsby-plugin-dark-mode',
		'gatsby-plugin-twitter'
	],
}
