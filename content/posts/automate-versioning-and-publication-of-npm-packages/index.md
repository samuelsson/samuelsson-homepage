---
title: 'Automate versioning and publication of npm packages'
date: '2020-06-06'
categories: ['tools']
tags: ['npm', 'git']
thumbnail: '../../thumbnails/npm.png'
---

A while ago I wrote a post about [always writing perfect commit messages](/always-write-perfect-commit-messages-with-git-commitizen-and-husky) by using commit linting tools and conventional templates. This makes the commit messages look great and formatted the same way regardless of who is committing but what is the next step you may ask. Wouldn't it be fun to be able to use these standardized commits to automate more steps in our project? Well, of course! How about automating the whole release flow with generating versions, changelogs, tags and publication?

## Tools to automate versioning

There are two popular tools for automatic versioning packages. They are [`standard-version`](https://github.com/conventional-changelog/standard-version) and [`semantic-release`](https://github.com/semantic-release/semantic-release), and in short they do pretty much the same thing.

* Using the commit messages to determine what changes have been made.
* Setting a new [semantic version](https://semver.org/) of the package based on the changes.
* Generating a `CHANGELOG.md` containing everything changed from last version.
* Committing these additions.
* Creating a new `tag` with the updated version number.

The difference between these two tools is when all these steps are happening and with what level of automation. With `standard-version` this is _usually_ triggered manually when we want to release a new version and with `semantic-release` this is _usually_ happening automatically on a CI/CD server together with pushing and publishing. So, to make a generalization of this, you can use `standard-version` for smaller packages that you can publish when you want and `semantic-release` is used for larger project with multiple contributors and with everything automated. An example is a small CLI tool that you develop yourself is using `standard-version` and a large monorepo with multiple packages and contributors can use `semantic-release`.

When starting with automatic versioning of packages it is in my opinion a good idea to start with a less automated approach to get a better understanding of what is happening. So I will describe how to set up `standard-version` in an existing npm project.  

## Using `standard-version`

The only requirement for `standard-version` to work is that all commits are following the [Conventional Commits Specification](https://www.conventionalcommits.org/), but that should already be set up with `commitlint` and `husky` mentioned in the beginning.

The first thing we need to do is adding the tool to our project.

```shell
yarn add --dev standard-version
```

After that we can add a new script which we can run when we want to release, add this to your `package.json`:

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

This way we only need to run `yarn release` every time we want a new version, and we can release whenever we want. After each new feature/fix, a specific day of the month or just when we feel the changes are plenty enough. But before running this script and releasing we should make an initial release.

We want to make a _first release_ which sets the initial version of the project. Let's try it with the `--dry-run` flag to just see what happens without actually doing any real changes.

```shell
yarn release --first-release --dry-run
```

It will output something like this:

```
$ standard-version --first-release --dry-run
✖ skip version bump on first release
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md

---
### 0.1.0 (2020-01-02)
---

✔ committing CHANGELOG.md
✔ tagging release v0.1.1
ℹ Run `git push --follow-tags origin master` to publish
```

Looks good! We also noticed that it will not be pushed nor published, but we'll take care of that in a bit.

Now, let's run it without the `--dry-run` flag to make this the real deal.

```shell
yarn release --first-release
```

That was really simple! Next release you simply skip the `--first-release` flag. As you noticed in the output we still need to push it to origin, let's do that.

```shell
git push --follow-tags origin master
```

We need the `--follow-tags` flag to ensure the new tag gets pushed as well, it can be set in your git config if you want it as default. If you now visit your project on GitHub (or equivalent) you can now see a new release has been made.

![First release on GitHub](./release.png)

As long as the name of your package is available on the npm registry we can also publish it.

```shell
npm publish
```

That's all you need to do from now on, `release`, `push` and `publish`. Super easy!

### Improve the process a bit more

Even though it's only three commands we can improve this a bit more by adding code quality checks and put everything in one single command.

It can be a good idea to check for errors in the code before releasing (especially when publishing) and for that we can use lifecycle scripts.

Let's lint and test our code before we actually do any of the release steps in `standard-version` by adding some scripts. In this example we are using `jest`, `eslint` and `TypeScript`. 

```json
{
  "scripts": {
    "release": "standard-version",
    "lint": "tsc --noEmit && eslint ./ --ext .ts",
    "test": "jest --ci"
  },
  "standard-version": {
    "scripts": {
      "prerelease": "yarn lint && yarn test"
    }
  },
}
```

Every time we run `yarn release` the `prerelease` script will trigger and lint and test our code before anything else. If everything goes well, `standard-version` will proceed with the release. If you have any linting errors or failing tests you can't release a new version. These checks should probably run even before being able to merge to master (so all releasable code is already checked) but that's another topic we won't discuss now 🤓

If you want to run a single command for everything, with compiling the TypeScript code before publishing for example, you can add something like this:

```json
{
  "scripts": {
    "prepublishOnly": "tsc",
    "mega-super-release": "yarn release && git push --follow-tags origin master && npm publish"
  }
}
```

But at this point you have automated so much it's almost like `semantic-release`, so maybe you should look into that now instead 😉
