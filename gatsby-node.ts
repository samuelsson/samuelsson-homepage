import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { toUrlSafePath } from './src/helpers';
import AllMarkdownRemark from './src/types/AllMarkdownRemark';

interface AllMarkdownData {
  allMarkdownRemark: AllMarkdownRemark;
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
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

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;
  const postTemplate = resolve('src/templates/post.tsx');
  const categoryTemplate = resolve('src/templates/category.tsx');
  const categoriesTemplate = resolve('src/templates/categories.tsx');
  const tagTemplate = resolve('src/templates/tag.tsx');
  const tagsTemplate = resolve('src/templates/tags.tsx');

  const tagSet: Set<string> = new Set();
  const categorySet: Set<string> = new Set();

  const createPosts = (data: AllMarkdownData): void => {
    data.allMarkdownRemark.nodes.forEach((node) => {
      const { tags = [], categories = [] } = node.frontmatter;
      const { slug } = node.fields;

      tags.forEach((tag) => tagSet.add(tag));
      categories.forEach((category) => categorySet.add(category));

      createPage({
        path: slug,
        component: postTemplate,
        context: {
          slug,
        },
      });
    });
  };

  const posts: {
    errors?: any;
    data?: AllMarkdownData;
  } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
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
  `);

  if (posts.errors) {
    // TODO: handle errors perhaps
    // reject(posts.errors);
  } else if (posts.data) {
    createPosts(posts.data);
  }

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
  allTags.forEach((tag) => {
    createPage({
      path: `/tags/${toUrlSafePath(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });

  // Create page for listing all posts containing category
  allCategories.forEach((category) => {
    createPage({
      path: `/categories/${toUrlSafePath(category)}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });
};
