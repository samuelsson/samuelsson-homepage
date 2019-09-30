---
title: 'Difference between dependencies, devDependencies and peerDependencies in npm'
date: '2019-09-30'
categories: ['tools']
tags: ['npm']
thumbnail: '../thumbnails/npm.png'
---

When creating a new npm project, all those with a `package.json` in the root directory, we usually don't create everything from scratch but need some dependencies. There are different type of dependencies that can be somewhat difficult to keep apart. I'll explain the differences between the three most common with a real world example.

Let's say we are developing a simple react component that will display the current date in text, like "Today is November 21st". We want to be able to import and use that component in a React app by installing it with `yarn add cool-date-text-component` (or whatever we call it).

## Dependencies

This is a list of third-party packages that our package/project directly depend on to be able to work at all.

In our example we need a package to get day and month of a Date object. `date-fns` can do that for us. We use it as `import { getDate } from 'date-fns'` and without this package our code wouldn't work.

We add it with any of:

* `yarn add date-fns`
* `npm install date-fns`

And it will look like this in our `package.json`:

```json
"dependencies": {
  "date-fns": "^2.0.1"
}
```

## devDependencies

These dependencies are required only when developing our package and will not be necessary when only using it. These can be packages for linting, compiling and running the dev environment.

In our example we want to ensure the code is correct with no errors so we want linting with `eslint`. This package is only used in our IDE and is never imported in our code. `devDependencies` could be used when building/compiling the package, like `TypeScript` and `babel`, but they are never used in the published package.

We add it with any of:

* `yarn add eslint --dev`
* `npm install eslint --save-dev`

And it will look like this in our `package.json`:

```json
"devDependencies": {
  "eslint": "^6.2.2"
}
```

## peerDependencies

This is usually the trickier one to grasp when first working with dependencies. `peerDependencies` are packages required to be installed in the application using your package, it expresses compatibility. That means if someone wants to use your package they also need to install these dependencies.

> peerDependencies are packages required to be installed in the application using your package.

In our example we have created a React component and if someone wants to use it they need React to be installed, it can't be used in a Vue project for example. So React is simply a peer dependency.

You may ask why React isn't a normal dependency under `dependencies` instead when it is required for the code to work. That is true but in this case the component we've developed is made for being used in an existing React application. If we'd rather added it as a normal dependency it would mean our package is a self-contained React application which maybe could be used in a Vue or Angular app.

If adding it as a normal dependency in this case it would probably result in multiple version of React being installed, one for our package and one for the application using it. That can be a problem itself but also really unnecessary.

When adding peer dependencies you don't need to add an exact version if you want greater compatibility. I usually add them as lowest required version to make future versions work without errors. This works for less complex packages.

`peerDependencies` are better added manually and it will look like this in our `package.json`:

```json
"peerDependencies": {
  "react": ">=16"
}
```

## Bonus dependencies

There are two more dependencies 🤯 I won't cover them in detail here but in short they are: 

* `optionalDependencies` - Are exactly that, optional, and can be dependencies that doesn't work on all machines/browsers and in that case have a fallback.
* `bundledDependencies` - Are like normal dependencies but are rather bundled with the package instead of fetched from the npm registry.
