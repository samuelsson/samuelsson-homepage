---
layout: post
title: Always perfect commit messages with Git Commitizen and Husky
tags: ['git']
---

We’ve all been there, looking at a function and don’t understand a thing of what it does. The next
step is of course look at the commit message, the git blame. That will explain everything for us.
Or will it?

We open it up and we see this:

```
Fix an error
```

What is that? What does it even mean? That is so bad and doesn’t tell us anything.

Fortunately there are tools that will help (or enforce) us to write better commit messages. We will
look at two tools in this guide, _Git Commitizen_ and _Husky_. We won’t install
_Git Commitizen_ directly as a dependency but we need some linting rules.

```shell
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

_Husky_ will hook into our git commands and check them with the linting config. Next we need some
configuration files in our project root.

Create a `.huskyrc` used for telling husky to check commit messages.

```json
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Then we need to configure our commit linting with a `commitlint.config.js`. Here we use the default
`config-conventional` but you can tweak it anyway you like to fit your style.

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

Now when we try to write a commit message that isn't valid according to our linting we will get an
error, or multiple.

![Error when writing invalif commit msg](/assets/images/posts/commit_message/error.png)

To help us write valid messages we can type `npx git-cz`. By using `npx` we don’t have to install
the package as mentioned before, but instead running the script directly.

![Pick what kind of commit it is](/assets/images/posts/commit_message/commiting.png)

![Help with writing good commit msg](/assets/images/posts/commit_message/help.png)

Great! Now we’ll always have perfect commit messages for all team members. Just follow the
step-by-step guide and if you want to know in more detail what to type
[here](https://github.com/erlang/otp/wiki/writing-good-commit-messages) is a good guide.
