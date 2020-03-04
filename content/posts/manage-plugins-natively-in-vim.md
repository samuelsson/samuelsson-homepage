---
title: 'Manage plugins natively in vim'
date: '2020-03-04'
categories: ['tools']
tags: ['vim', 'terminal', 'quick tip']
thumbnail: '../thumbnails/vim.png'
---

There are many useful plugins for vim and I've always used a plugin manager to handle them all. Recently I found out that vim has had support for package management out of the box a long time now. It was actually really simple to switch.

First we need to create a package directory where we will place all our plugins.

```shell
mkdir -p ~/.vim/pack/plugins/start
```

The `plugins` directory can be named anything but because we are using this for plugins it's a fitting name. If you have many plugins you can organize them by category or similar. The `start` folder tells vim to load the packages when vim starts.

After that we can put all plugins into that directory and they will be loaded automatically every time. You can find a list of all cool plugins at [Vim Awesome](https://vimawesome.com/).

To install a plugin we simply type this:

```shell
git clone https://github.com/itchyny/lightline.vim ~/.vim/pack/plugins/start/lightline
```

Next time you open vim the plugin(s) will be loaded.

## Load plugins manually

Maybe not all plugins should be loaded automatically each time we open vim and thus we want to be able to load them manually. It's as simple as the first step, we just create a directory like this.

```shell
mkdir -p ~/.vim/pack/plugins/opt
```

All plugins put in that folder are not loaded automatically and can be opt-in by typing this inside vim:

```shell
:packadd plugin-name
```

That will load the plugin called `plugin-name` in `~/.vim/pack/plugins/opt/plugin-name`
