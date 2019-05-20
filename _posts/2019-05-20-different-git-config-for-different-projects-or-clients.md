---
layout: post
title: Different git config for different projects or clients
tags: ['git', 'dotfiles']
---

If only working on projects with one single git service you won’t have a problem with email
addresses differ between accounts. All your commits will always use the same information. But say
you are using one service for private projects, such as GitHub, and another service for work related
projects, like GitHub Enterprise. If that’s the case you definitely don’t want to use the same
configuration for both of them. One solution is to set these manually on every repository but that’s
not very smooth in the long run. Fortunately we can set up conditional git configuration per
directory.

Your current `.gitconfig` (or create one in your home dir if you don’t have one) might look
something like this:

```shell
[user]
    name = Erik Samuelsson
    email = 123123+username@users.noreply.github.com
[core]
    editor = vim
```

Your email will probably differ if you have one address for work and one for personal. Maybe even
your name will be different if you lied about everything in your job application. The solution is to
create one git config for each client or service you use.

First make sure you organize your personal and client directories in different locations. I organize
them like this:

```
~/Projects
├── work
│   ├── client_a
│   │   └── repo_a1
│   │   └── repo_a2
│   └── client_b
│       └── repo_b1
│       └── repo_b2
└── personal
    ├── repo_1
    └── repo_2
```

Now we need to add some conditionals to our  `~/.gitconfig` so it looks similar to this:

```shell
[user]
    name = Erik Samuelsson
    email = 123123+username@users.noreply.github.com
[core]
    editor = vim

[includeIf "gitdir:~/Projects/work/client_a/**"]
    path = ~/.dotfiles/git/gitconfig-client_a
[includeIf "gitdir:~/Projects/work/client_b/**"]
    path = ~/.dotfiles/git/gitconfig-client_b
```

By having our personal information set as default every time we can create repos anywhere without
worrying about the _name_ and _email_. In the above example the paths are located in my dotfiles
directory but they can be saved anywhere. Let’s create them and add different values inside.

```shell
; ~/.dotfiles/git/gitconfig-client_a

[user]
    name = Erik Samuelsson
    email = erik@client_a.com
```

```shell
; ~/.dotfiles/git/gitconfig-client_b

[user]
    name = Bob Anderson
    email = bob@client_b.com
```

Now we need to test everything to see if it works.

Navigate to your personal folder and type this in the terminal:

```shell
cd ~/Projects/personal/
mkdir test
cd test
git init
touch testfile
git config user.email
```

The last command should output the correct email address for the current directory. Repeat for all
directories and the addresses should be different.
