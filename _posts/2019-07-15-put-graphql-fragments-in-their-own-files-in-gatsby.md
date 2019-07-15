---
layout: post
title: "Put GraphQL fragments in their own files in Gatsby"
tags: ['gatsby', 'graphql']
---

Gatsby uses GraphQL under the hood for managing data and it does this really well. It usually doesn't take long before the queries grow big and some duplicated code will occur. This is where `fragments` come in handy. A way to break out some parts of the queries into... well, fragments, to be able to use it in other places.

Let's say we have a simple query like this for getting blog posts from markdown files:

```javascript
// /src/pages/blog.jsx

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { limit: 5 }) {
      edges {
        node {
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
```

If we want to display these posts on multiple places the majority of the query will look exactly the same, only the `limit` may change.

What we want to do is to break out the duplicated code into a fragment. We can then use it in the query with three dots in front of it. You need to change `MarkdownRemarkConnection` to whatever type you want to use.

```javascript
// /src/pages/blog.jsx

export const query = graphql`
  fragment PostListItem on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          title
          tags
        }
      }
    }
  }

  query BlogPageQuery {
    allMarkdownRemark(sort: { limit: 5 }) {
      ...PostListItem
    }
  }
`;
```

But as you can see this doesn't make much difference if we can't put it somewhere else so we can use it in other queries. Gatsby actually has a built in solution that makes this really simple. We just need to put all fragments in a specially named directory and Gatsby does everything for us.

We create the folder `/src/graphql-fragments` and in here we add files and export all our fragments.

```javascript
// /src/graphql-fragments/PostListItem.js

import { graphql } from 'gatsby';

export const PostListItem = graphql`
  fragment PostListItem on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          title
          tags
        }
      }
    }
  }
`;

```

And just as before we can use it in our queries, but without having to import them or anything. They are globally accessible.

```javascript
// /src/pages/blog.jsx

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { limit: 5 }) {
      ...PostListItem
    }
  }
`;
```

You can change arguments or even add more fields.

```javascript
// /src/pages/all-posts.jsx

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { limit: 999 }) {
      totalCount
      ...PostListItem
    }
  }
`;
```

Just don't overdo it 😎 not everything needs to be a fragment.
