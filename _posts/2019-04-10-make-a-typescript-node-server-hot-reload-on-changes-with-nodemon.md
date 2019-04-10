---
layout: post
title: Make a TypeScript Node server hot reload on changes with Nodemon
tags: ['node', 'typescript']
---

When building a front-end app today it is common to have the app hot reloading in the browser every time you make a
change. This can also be done for your back-end app built with Node by using a package called Nodemon. This app watches
all your files for changes and, if it finds any, reloads the server. Nodemon is simple to use but needs some more
configuration when you use TypeScript.

**In this guide I assume you already have a Node TypeScript project set up. Otherwise you'll easily find starter guides
on Google and will be up and running in five minutes.**

First of all we need to install `nodemon` and `ts-node`. We only need them in development. *nodemon* is used for watching
our files and *ts-node* is used to run TypeScript in Node.

`npm install --save-dev nodemon ts-node`

After that we'll create a new file in the root folder of the project named `nodemon.json`. This will be the content:
{% highlight json linenos %}
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", "node_modules"],
  "watch": ["src"],
  "exec": "npm start",
  "ext": "ts"
}
{% endhighlight %}

The properties are pretty much self explanatory.

* **ignore**: What patterns to ignore from triggering a hot reload. Test files and node_modules for example.
* **watch**: The folder (or folders) to watch, usually the `src` folder but can be anything.
* **exec**: The npm script to run when a hot reload is triggered.
* **ext**: What file extensions to watch, `ts` is a no-brainer but can also be `json` for example.

Then we need to update our `package.json` with two new scripts.

{% highlight json linenos %}
"scripts": {
  "dev": "nodemon",
  "start": "ts-node src/index.ts"
}
{% endhighlight %}

* **dev**: This script is the main one we'll be using every time we develop locally. It will run nodemon which will
check for our `nodemon.json` file we created earlier. Every time a change is made matching our criteria the script
specified in the `exec` property is run.
* **start**: This is a normal npm script starting our server. Should be pointing to the main server file.

That's it, as easy as that. Every time you want to start the server with hot reloading you just run `npm run dev`. If
you want to start the server without this you can just run `npm run start` directly and it will work exactly the same,
except you need to stop and start the server manually. One reason to do this is to save battery power because nodemon
watching and restarting all the time could consume more energy. 