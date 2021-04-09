# Samuelsson's personal homepage

![Deploy](https://github.com/samuelsson/samuelsson-homepage/workflows/Deploy/badge.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Visit it at [samuelsson.dev](https://samuelsson.dev/).

## Manage content submodule

The content (pages, blog posts, images) is a submodule of a private repository and can only be fetched by me ([@samuelsson](https://github.com/samuelsson)) or others with read access. That means if you clone this repo you won't see any content.

For those having permissions to the content submodule it can be updated locally with `git submodule update --remote`. When there are new content the submodule hash will be updated and added as new changes to git in this repo. This can then be committed and pushed as normal.

If it's the first time cloning the project you need to do it recursively for the submodules to be fetched as well, `git clone --recursive <project url>`. Or if the project is already cloned, you can do it with `git submodule update --init --recursive`.

If you don't have access or want to add your own content it is easily achieved with the following directory structure:

```
/
└── content
    ├── pages
    │   ├── 404.mdx
    │   ├── about.mdx
    │   ├── blog.mdx
    │   ├── contact.mdx
    │   ├── index.mdx
    │   └── privacy.mdx
    ├── posts
    │   ├── blog-post-1.md
    │   ├── post2.mdx
    │   └── third-blog-post
    │       ├── index.md
    │       ├── image.png
    │       └── image2.png
    ├── thumbnails
    │   ├── git.png
    │   ├── typescript.png
    │   └── yarn.png
    └── siteMetadata.ts (with a default export matching the interface in src/types/SiteMetadata.ts)
```

Posts file name need to be hyphenated because they will also become the url path to the post. The reason for this not being transformed automatically is that sometimes the path need to differ from the actual title of the post.


### Format of post file - Frontmatter

The posts are either in `.md` or `.mdx` and in their simplest form plain markdown. They, however, **must** have frontmatter at the absolute top of the file. Frontmatter is written inside `---` and is the metadata of the post.

```
---
title: 'Title of the post'
date: '2019-11-21'
thumbnail: '../thumbnails/typescript.png'
categories: 
  - code
tags: 
  - typescript
  - javascript
  - promises
---

Here is the normal markdown content of the post.
```

- No top-level header needed because `title` will become `h1` at the top.
- Date formatted in ISO 8601 - `YYYY-MM-DD`
- Preferably have only one category (wider than tags)
- You can have multiple tags (more specific than category)

## Deployment

Currently, the deployment of the site is triggered when pushing a new release tag. This is automated with `standard-version` and can be executed with the command `yarn release`. This will do the following:

- Pre-release hook linting the code, break if linting errors
- Bumping the version in `package.json`
- Add changes the CHANGELOG
- Creating a new version tag
- Commit the changes
- Pushing to GitHub with the version tag
- Triggering a build and deployment in GitHub Actions
