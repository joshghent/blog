module.exports = {
  siteMetadata: {
    title: "Developer Musings",
    author: "Josh Ghent",
    company: {
      name: "Turbo Technologies",
      url: "https://turboapi.dev",
    },
    description:
      "Self-taught software developer and solo-maker. Creating fun products and writing about my journey. Helping to teaching new developers about breaking into the industry and improving workflows in your development team.",
    siteUrl: "https://joshghent.com",
    tinyletterUrl: "https://tinyletter.com/joshghent",
    defaultTags: [
      "blog",
      "gatsby",
      "javascript",
      "react",
      "josh",
      "ghent",
      "esfiddle creator",
      "esfiddle",
      "self-hosted software",
      "josh ghent",
      "Joshua Ghent",
      "Josh Ghent",
      "Turbo Technologies Ltd",
      "Turbo Technologies",
      "GiveTap",
      "TapTable",
      "leicesterjs",
      "midlandsjs",
      "todoist",
      "productivity",
      "developers",
      "software",
      "engineering",
      "software engineering",
      "automation",
      "terraform",
      "twitter",
      "minimalism",
      "simplicity",
      "technical architect",
      "technical speaker",
      "meetup organiser",
      "github actions geek",
      "turboapi",
      "placedog",
      "timberseed",
      "web developer walsall",
      "full stack developer walsall",
      "full stack developer",
      "nodejs developer walsall",
      "backend developer walsall",
      "full stack developer west midlands",
      "freelance web developer walsall",
      "freelance full stack developer west midlands",
      "yorkpress developer",
      "technical architect",
      "yorkpress technical project lead",
      "cappfinity developer",
      "koru developer",
      "aws developer",
      "nodejs developer",
      "python developer",
      "typescript developer",
    ],
    social: {
      twitter: "joshghent",
      linkedin: "https://www.linkedin.com/in/joshghent/",
      github: "joshghent",
      email: "me@joshghent.com",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/notes`,
        name: "notes",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets/images/photography`,
        name: "photos",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_data`,
        name: "data",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(({ node }) => ({
                ...node.frontmatter,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `
              {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {
                  frontmatter: {
                    date: { ne: null }
                  }, fileAbsolutePath: {regex: "/^(?!.*(notes).*$)/"}
                }) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        date
                        title
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Developer Musings",
          },
          {
            serialize: ({ query: { site, allFile } }) =>
              allFile.edges.map((node) => ({
                title: `${site.siteMetadata.siteTitle} Photo - ${node.id}`,
                description: node.changeTime,
                date: node.changeTime,
                url: node.publicURL,
                guid: node.publicURL,
              })),
            query: `
              {
                allFile(filter: {sourceInstanceName: {eq: "assets"}, absolutePath: { regex: "/photography/"}}) {
                  edges {
                    node {
                      id
                      absolutePath
                      publicURL
                      changeTime
                    }
                  }
                }
              }
            `,
            output: "/photos.xml",
            title: "Developer Musings - Photos",
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(({ node }) => ({
                title: node.frontmatter.date,
                description: node.html,
                date: node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}/notes#${node.frontmatter.keyDate}`,
                guid: node.frontmatter.keyDate,
              })),
            query: `
            {
              allMarkdownRemark(
                sort: {fields: [frontmatter___date], order: DESC},
                filter: {frontmatter: {date: {ne: null}}, fileAbsolutePath: {regex: "/notes/"}}
              ) {
                edges {
                  node {
                    id
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      date(formatString: "do MMMM YYYY")
                      keyDate: date(formatString: "YYYY-MM-DDTHH:MM")
                    }
                    fileAbsolutePath
                  }
                }
              }
            }`,
            output: "/notes.xml",
            title: "Developer Musings - Notes",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Developer Musings",
        short_name: "Dev Musings",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "content/assets/icon.png",
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typography",
    {
      resolve: "gatsby-plugin-brotli",
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        purgeOnly: ["global.css"], // Purge only these files/folders
      },
    },
    {
      resolve: "gatsby-plugin-indieweb",
      options: {
        auth: {
          twitter: "joshghent",
          github: "joshghent",
          email: "me@joshghent.com",
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
    },
  ],
};
