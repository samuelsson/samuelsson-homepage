---
title: 'Update nvm installed node version and keep globally installed packages'
date: '2019-07-01'
categories: ['tools']
tags: ['node', 'nvm', 'npm']
thumbnail: '../thumbnails/node.png'
---

Node Version Manager is great for managing and working with different node versions but can be a little tricky to update to a newer version the first times. Especially if you want to keep all the globally installed packages. It’s actually really simple and here I’ll show you how.

Typing `nvm ls` will list all our installed node versions. We can check if there is a newer version by typing `nvm ls-remote`. That will output a lot of rows because there are many node versions. We can actually `grep` to make it more readable.

This will list the latest LTS versions:

```shell
nvm ls-remote --lts | grep Latest
```

This will list all v12.x versions:
```shell
nvm ls-remote | grep v12
```

If there is a newer version we can update to that one 💪🏻 We'll do it differently depending on if it's the absolute latest or an LTS version.

## Updating the latest version
Let’s say that our currently installed version is `v12.4.0` and we want to install `v12.5.0`, which is the latest version in this example. Nvm has a nifty command that till do this for us, without keeping track of version numbers.

```shell
nvm install node --reinstall-packages-from=node
```

The nvm docs describes this pretty good:

> This will first use “nvm version node” to identify the current version you’re migrating packages from. Then it resolves the new version to install from the remote server and installs it. Lastly, it runs “nvm reinstall-packages” to reinstall the npm packages from your prior version of Node to the new one.

You can then type `npm list -g --depth=0` to check it if everything was reinstalled correctly and `npm update -g` if you want to update all the packages. 

## Updating the latest LTS version
Updating to the latest LTS version is pretty much the same but we might need to enter the current version manually. So just in case we need to find out out currently installed LTS versions by typing `nvm ls`, let’s say it’s `10.15.3` (dubnium).

```shell
nvm install lts/* --reinstall-packages-from=lts/*
```

If the above doesn’t work because `lts/*` isn’t linked you might need to specify which LTS version to install, either by LTS name or number.

This will install the latest Dubnium (LTS version by name):

```shell
nvm install lts/dubnium --reinstall-packages-from=lts/dubnium
```

Or if `dubnium`hasn’t been linked before:

```shell
nvm install lts/dubnium --reinstall-packages-from=10.15.3
```

## Remove older versions not in use anymore
There’s no need to keep old versions if you don’t need a specific version. List the currently installed versions by typing `nvm ls`. It looks something like this:

```
       v10.15.3
       v10.16.0
        v12.4.0
->      v12.5.0
         system
```

Here we see that `v10.15.3` and `v12.4.0` have been updated and can be removed, one at a time currently.

```shell
nvm uninstall 10.15.3
nvm uninstall 12.4.0
```

That's it 🚀
