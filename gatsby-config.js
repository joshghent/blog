module.exports = {
  siteMetadata: {
    title: 'Developer Musings',
    author: 'Josh Ghent',
    company: {
      name: 'TurboAPI',
      url: 'https://turboapi.dev',
    },
    description:
      'Self-taught software developer and solo-maker. Creating fun products and writing about my journey. Helping to teaching new developers about breaking into the industry and improving workflows in your development team.',
    siteUrl: 'https://joshghent.com',
    tinyletterUrl: 'https://tinyletter.com/joshghent',
    defaultTags: [
      'blog',
      'gatsby',
      'javascript',
      'react',
      'josh',
      'ghent',
      'esfiddle creator',
      'esfiddle',
      'self-hosted software',
      'josh ghent',
      'Joshua Ghent',
      'Josh Ghent',
      'Turbo Technologies Ltd',
      'Turbo Technologies',
      'GiveTap',
      'TapTable',
      'leicesterjs',
      'midlandsjs',
      'todoist',
      'productivity',
      'developers',
      'software',
      'engineering',
      'software engineering',
      'automation',
      'terraform',
      'twitter',
      'minimalism',
      'simplicity',
      'technical architect',
      'technical speaker',
      'meetup organiser',
      'github actions geek',
      'turboapi',
      'placedog',
      'timberseed',
      'web developer walsall',
      'full stack developer walsall',
      'full stack developer',
      'nodejs developer walsall',
      'backend developer walsall',
      'full stack developer west midlands',
      'freelance web developer walsall',
      'freelance full stack developer west midlands',
      'yorkpress developer',
      'technical architect',
      'yorkpress technical project lead',
      'cappfinity developer',
      'koru developer',
      'aws developer',
      'nodejs developer',
      'python developer',
      'typescript developer',
    ],
    social: {
      twitter: 'joshghent',
      linkedin: 'https://www.linkedin.com/in/joshghent/',
      github: 'joshghent',
      email: 'me@joshghent.com',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-feed',
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
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map((edge) => ({
              ...edge.node.frontmatter,
              description: edge.node.excerpt,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteUrl + edge.node.fields.slug,
              guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            })),
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
            output: '/rss.xml',
            title: 'Josh Ghent Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Developer Musings',
        short_name: 'Dev Musings',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/icon.png',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-plugin-preact',
    'gatsby-plugin-typography',
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        purgeOnly: ['global.css'], // Purge only these files/folders
      },
    },
    {
      resolve: 'gatsby-plugin-indieweb',
      options: {
        auth: {
          twitter: 'joshghent',
          github: 'joshghent',
          email: 'me@joshghent.com',
        },
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-no-javascript',
  ],
};
