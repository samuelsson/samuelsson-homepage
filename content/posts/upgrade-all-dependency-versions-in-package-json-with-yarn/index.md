---
title: "Upgrade all dependency versions in package.json with yarn"
date: '2020-06-23'
categories: ['tools']
tags: ['yarn', 'npm']
thumbnail: '../../thumbnails/yarn.png'
---

Updating dependencies in a node project is pretty straight forward and easy to do with the command `yarn upgrade`. As default, versions in `package.json` are prepended with a caret (like `^2.1.2`) which means this upgrade command will upgrade all non-major versions to the latest. Npm packages are using [Semantic Versioning (semver)](https://semver.org/) so a non-major version is a bump that is not changing the first number. Version `^2.1.2` can be upgraded to `2.3.0` but not to `3.0.0` for example. If you want to dig deeper into the prepending you can read more [here](https://docs.npmjs.com/misc/semver#versions).

A difference between using `npm upgrade` and the equivalent in yarn, `yarn upgrade`, is that with the `npm` command you get the updated versions in your `package.json`. With the `yarn` command you don't see any changes of the versions in that file.

This is usually not a big problem because you have a `yarn.lock` in your root directory that keeps track of all your installed versions. So when your `package.json` says that a version is `^2.1.2` that means the version `2.3.0` could also be installed because it's **not** a _MAJOR_ change and that version is instead tracked in the `yarn.lock` file. So next time you install this project you will get version `2.3.0` because that is the "locked" one even though it has a lower version in the `package.json`.

This is all by design but if you are a perfectionist and pedantic like me this is not enough because I want to open my `package.json` and see exactly what versions are installed. There is a simple command to also update the `package.json` when upgrading packages through the terminal.

As an example I list all outdated packages in my project and I want to update to latest `eslint` but not `eslint-plugin-react-hooks`.

![Listing all outdated dependencies](./outdated.png)

What I can do now is to run an interactive upgrade tool that is bundled with yarn that gives me the option to pick all versions I want to bump to latest.

```shell
yarn upgrade-interactive --latest
```

This will list all upgradeable versions, and you can select all those you want upgraded with `space`. When done you just press enter and all checked packages will be upgraded and also bumped in `package.json`.

The trick here is that we are using the `--latest` flag which bypasses the default upgrade rule about _MAJOR_ versions, that's why the `package.json` is also updated to reflect that.

![Select what dependencies to be updated](./upgrade.png)

Just beware that bumping a _MAJOR_ version usually has breaking changes so read the CHANGELOG for that specific package before continuing.
