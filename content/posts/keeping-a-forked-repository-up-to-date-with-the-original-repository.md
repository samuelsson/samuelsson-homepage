---
title: 'Keeping a forked repository up to date with the original repository'
date: '2019-01-26'
categories: ['tools']
tags: ['git']
thumbnail: '../thumbnails/git.png'
---

If you fork an existing git repository and add that fork to your own repositories it will not be in sync automatically with the original repo. That could of course be a good thing if you want to develop the project in your own direction without anyone "ruining" it for you. But sometimes you want the best from both worlds, have your own repo but also get all the updates of the original source. This can be achieved by setting an upstream remote.

## Setting a remote for the forked repo

Navigate to the folder of your forked repository and type this:

```shell
git remote -v
```

This will display all remote addresses used in your repository. If nothing is changed here it will just point to origin, i.e. GitHub/GitLab.

```
origin  git@gitlab.com:user/forked_repo (fetch)
origin  git@gitlab.com:user/forked_repo (push)
```

What we need to do now is to link the upstream repository. This way we will have linked addresses for our own repo, origin, as well as the original source, upstream.

Still in your project folder, type this:

```shell
git remote add upstream git@gitlab.com:anotheruser/original_repo.git
```

This is the same address as the one used for cloning, so just visit the repo and copy the address. If you type `git remote -v` again you will now see something like this:

```
origin      git@gitlab.com:user/forked_repo (fetch)
origin      git@gitlab.com:user/forked_repo (push)
upstream    git@gitlab.com:anotheruser/original_repo.git (fetch)
upstream    git@gitlab.com:anotheruser/original_repo.git (push)
```

## Sync your forked repository with upstream

Now when the upstream branch is set we can easily update our own repository with all the new commits and branches existing on the original source.

First we check out our master branch, the one we want to keep in sync by simply typing:

```shell
git checkout master
```

Then we need to fetch the branches and their commits of the upstream repo.

```shell
git fetch upstream
```

And after that we just need to merge the updated upstream master branch with our current (master) local branch.

```shell
git merge upstream/master
```

If you got any conflicts you need to resolve them but other than that, your forked local master branch is now synced with the original upstream master branch. If you have local branches you can simply merge your local master instead of having to merge with upstream.
