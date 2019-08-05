const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'src/content/posts',
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.jsx');
  const categoryTemplate = path.resolve('src/templates/category.jsx');
  const categoriesTemplate = path.resolve('src/templates/categories.jsx');
  const tagTemplate = path.resolve('src/templates/tag.jsx');
  const tagsTemplate = path.resolve('src/templates/tags.jsx');

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  tags
                  categories
                }
              }
            }
          }
        }
      `).then(posts => {
        if (posts.errors) {
          reject(posts.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();

        posts.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const { tags, categories } = node.frontmatter;
          const { slug } = node.fields;

          if (tags) {
            tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (categories) {
            categories.forEach(category => {
              categorySet.add(category);
            });
          }

          // Create post pages
          createPage({
            path: slug,
            component: postTemplate,
            context: {
              slug,
            },
          });
        });

        const allTags = Array.from(tagSet);
        const allCategories = Array.from(categorySet);

        // Create page for listing all tags
        createPage({
          path: 'tags',
          component: tagsTemplate,
          context: {
            tags: allTags,
          },
        });

        // Create page for listing all categories
        createPage({
          path: 'categories',
          component: categoriesTemplate,
          context: {
            categories: allCategories,
          },
        });

        // Create page for listing all posts containing tag
        allTags.forEach(tag => {
          const urlSafeTag = tag.toLowerCase().replace(/\s/g, '-');

          createPage({
            path: `/tags/${urlSafeTag}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          });
        });

        // Create page for listing all posts containing category
        allCategories.forEach(category => {
          const urlSafeCategory = category.toLowerCase().replace(/\s/g, '-');

          createPage({
            path: `/categories/${urlSafeCategory}/`,
            component: categoryTemplate,
            context: {
              category,
            },
          });
        });
      })
    );
  });
};
