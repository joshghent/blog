const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve('./src/templates/blog-post.jsx');
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });

    const date = new Date(node.frontmatter.date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const yearMonth = `${year}-${month}`;
    const day = date.getDate();

    createNodeField({ node, name: 'year', value: year });
    createNodeField({ node, name: 'month', value: month });
    createNodeField({ node, name: 'year-month', value: yearMonth });
    createNodeField({ node, name: 'day', value: day });
  }
};
