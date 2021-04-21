import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';
import { toUrlSafePath } from './src/helpers';
import allMdx from './src/types/AllMdx';
import {
  CategoriesPageContext,
  CategoryPageContext,
  TagPageContext,
  TagsPageContext,
} from './src/types/PageContext';

interface AllMarkdownData {
  allMdx: allMdx;
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
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
  const pageTemplate = resolve('src/templates/page.tsx');

  const tagSet: Set<string> = new Set();
  const categorySet: Set<string> = new Set();

  const createContentPages = async (type: 'pages' | 'posts'): Promise<void> => {
    const posts: {
      errors?: any;
      data?: AllMarkdownData;
    } = await graphql(`
      {
        allMdx(filter: { fileAbsolutePath: { regex: "/content/${type}/" } }) {
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
      // eslint-disable-next-line no-console
      console.log(`Error getting content for ${type}!`);
    }
    posts.data?.allMdx.nodes.forEach((node) => {
      const { tags = [], categories = [] } = node.frontmatter;
      const { slug } = node.fields;

      tags?.forEach((tag) => tagSet.add(tag));
      categories?.forEach((category) => categorySet.add(category));

      createPage({
        path: slug,
        component: type === 'pages' ? pageTemplate : postTemplate,
        context: {
          slug,
        },
      });
    });
  };

  // Create static pages from content directory
  await createContentPages('pages');
  await createContentPages('posts');

  const allTags = Array.from(tagSet);
  const allCategories = Array.from(categorySet);

  // Create page for listing all tags
  createPage<TagsPageContext>({
    path: 'tags',
    component: tagsTemplate,
    context: {
      tags: allTags,
    },
  });

  // Create page for listing all categories
  createPage<CategoriesPageContext>({
    path: 'categories',
    component: categoriesTemplate,
    context: {
      categories: allCategories,
    },
  });

  // Create page for listing all posts containing tag
  allTags.forEach((tag) => {
    createPage<TagPageContext>({
      path: `/tags/${toUrlSafePath(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });

  // Create page for listing all posts containing category
  allCategories.forEach((category) => {
    createPage<CategoryPageContext>({
      path: `/categories/${toUrlSafePath(category)}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });
};
