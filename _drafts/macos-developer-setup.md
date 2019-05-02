---
layout: post
title: "The perfect Mac developer setup"
---

# The perfect Mac developer setup

This will be the most perfect dev machine ever :)

## Prerequisites and Homebrew installation

Open a the terminal and install Xcode Command Line Tools (required by Homebrew).

```bash
xcode-select --install
```

After that we can install Homebrew itself with a slightly longer command.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then we should generate a couple of SSH keys while we're at it. You can read more here.

Now with Homebrew install the fun begins, let's install some tools and applications.

## Gather all our configurations in a dotfiles project

Due to all the customization we are going to do we should gather everything we change in one place. Configuration files in MacOS (or UNIX/Linux in general) are usually hidden in the home folder of the user and begins with a dot. This is the reason why it's common to gather all settings in a so called *dotfiles* folder. So let's create it in our home folder.

```bash
mkdir .dotfiles
```

This folder will be hidden and you should really back it up with git or similar. It's also important to keep it private if you save personal data. **Never save SSH keys or other credentials on git.**

You can organize all files in this folder whatever way that feels good for you. Usually you don't need subfolder until your dotfiles grow really big.

### Symlinking all config files from the dotfiles folder

Out applications and tools doesn't know we are using a dotfiles folder and usually save the configurations in our home folder, or some other place. Because of this we need to save the original file in the dotfiles folder but symlinking it to the location where the corresponding tool looks for it. 

Let's say you have a config file called `.bashrc` in your home folder. We then move this to our dotfiles folder.

```bash
mv ~/.bashrc ~/.dotfiles/bashrc
```

We can ommit the leading becuase we don't need to hide it in our already hidden dotfiles folder. Then we need to symlink it to the correct location so it can be used as before. In the home folder we of course need the leading dot.

```bash
ln -s ~/.dotfiles/bashrc ~/.bashrc
```

You can do this for all files you would like to keep combined, just symlink them to their original location and everything will work just fine. Just make sure your backup solution works with symlinked files if you don't push to git.

## Pimp our terminal with zsh and oh-my-zsh

I hope you didn't think the perfect developer setup meant we were going to use a stock MacOS. Because we are going to install a lot of fun stuff :)

First of all we are going to install *iTerm 2*, a better terminal application than the built in one. And zsh, a better shell than the built in one (bash).

```bash
brew cask install iterm2
```

Open iTerm 2 and configure it as you want. When you are done (several hours later maybe due to the number of settings) we are going to install zsh. There are a couple of differences compared to bash but the real puncher here is the framework oh-my-zsh, a super combo with a lot of useful plugins. Zsh is already installed on MacOS  but we want the latest version, so let's install it with brew.

```bash
brew install zsh
```

Then we need to set our default shell to zsh, the brew installed zsh. 

```bash
chsh -s /bin/zsh
```

Restart iTerm and zsh will be your default shell. Now let's install *oh-my-zsh*.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Zsh uses a configuration file in your home folder called `.zshrc`. You now what you should do with it? Exactly! Move it to your dotfiles folder and then symlink it to the original location (`~/.zshrc`).

Restart once more and you should be running zsh with oh-my-zsh, let's start the customization.

### Change theme to powerlevel9k

The most important thing in a terminal is a good looking theme, right? Let's install *powerlevel9k* and put it into the theme folder of oh-my-zsh. The customer folder will not be overwritten when updating oh-my-zsh.

```bash
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

Open `~/.zshrc` and edit the theme property for oh-my-zsh to load the theme at startup, it should look like this:

```bash
ZSH_THEME="powerlevel9k/powerlevel9k"
```

This theme needs special fonts to work properly. There are many to choose from but I like *nerd-fonts*. We can actually install them with brew (like everything, get used to it 😉) but we need to add font support first.

```bash
brew tap caskroom/fonts
brew cask install font-hack-nerd-font
```

Now open iTerm settings and navigate to `Profiles > Text > Font`. Choose *Menlo Regular 13pt* and then check *Use a different font for non-ASCII text*. And for these non-ASCII fonts we pick our newly installed font, *Hack Regular Nerd Font Complete 13 pt*.

Change colors and other iTerm settings to whatever feels good for you.

**my powerlevel9k config here**

### oh-my-zsh plugins

Oh-my-zsh has many cool and useful plugins which you can read more about [here](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins). The `git` plugin is really good when working with git and the `z` plugin for easily jumping between directories.

### Add your own aliases and functions to zsh

Let's create two new files.

```bash
mkdir ~/.dotfiles/zsh 
touch ~/.dotfiles/zsh/aliases.zsh
touch ~/.dotfiles/zsh/functions.zsh
```

Then we want to tell zsh to use everything in theses folders, so open up `.zshrc` and add:

```bash
export DOTFILES="$HOME/.dotfiles"
source $DOTFILES/zsh/aliases.zsh
source $DOTFILES/zsh/functions.zsh
```

Now is actually a great opportunity to organize our `.zshrc`. Here's an example of mine right now. Many of these thing will be discussed later in this guide, like `fzf`.

```bash
##################################################
# oh-my-zsh main config file
##################################################

POWERLEVEL9K_MODE='nerdfont-complete'
ZSH_THEME="powerlevel9k/powerlevel9k"
plugins=(fzf git npm osx z)

# Exports
export ZSH="$HOME/.oh-my-zsh"
export DOTFILES="$HOME/.dotfiles"
export VISUAL="vim"
export EDITOR="$VISUAL"
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"
export FZF_BASE="/usr/local/opt/fzf"

# Loading sources
source $ZSH/oh-my-zsh.sh
source $DOTFILES/zsh/variables.zsh
source $DOTFILES/zsh/aliases.zsh
source $DOTFILES/zsh/functions.zsh
source $DOTFILES/zsh/powerlevel9k.zsh

# Misc until grows larger ;)
COMPLETION_WAITING_DOTS="true"
```

## Useful tools and applications

There are a lot of useful software like NodeJS, Google Chrome, VS Code or WebStorm to install. You can install them all with brew. If you are uncertain of the exact name you can search for it with the search command.

```bash
brew search *name*
```

Then you simply install it with `brew install *name*` for command line software and `brew cask install *name*` for "real", binary applications.

What binary applications to install is quite subjective, such as Google Chrome or Mozilla Firefox, but there are a lot of interesting command line utilities.

Here are a couple of useful tools we'll need (some already exists on MacOS but we want the latest vesrions).

```bash
brew install node
brew install bat
```

### Installing fzf

```bash
brew install fzf
```

Open your .zshrc and add `export FZF_BASE="/usr/local/opt/fzf"` to it. Then add `fzf` to the enabled plugins. It should contain:

```bash
plugins=(fzf ...)
export FZF_BASE="/usr/local/opt/fzf"
```

### Install and configure git

Git is one of the most important tools you can have on your Mac (yes, that's pretty subjective but maybe it's true 😉). Git already works in MacOS but we can install a newer version from brew.

```bash
brew install git
```

Then we need to create a configuration file in our home folder named `.gitconfig`, containing some user credentials. But you know the drill by now with configurations files, so the real file is in our dotfiles folder and is only symlinked to our home folder.

```bash
touch ~/.dotfiles/gitconfig
ln -s ~/.dotfiles/gitconfig ~/.gitconfig
```

Then we can put something similar like this in it:

```bash
[user]
	name = John Johnsson
	email = 123456+username@users.noreply.github.com
[github]
	user = username
[gitlab]
    user = Username
[core]
	editor = vim
```

### Install and configure vim

Vim is a nice text editor (when you know how to quit the open document) and there are many useful plugins. We'll set up a couple of them here. But first we need to install the latest version.

```bash
brew install vim
```

Then we need to create a vim configuration file (symlinked from dotfiles of course ) in `~/.vim/vimrc`.

```bash
touch ~/.dotfiles/vimrc
mkdir ~/.vim
ln -s ~/.dotfiles/vimrc ~/.vim/vimrc
```

In the `vimrc` file we add some stuff.

```bash
""""" Sources and config
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
source ~/.dotfiles/vim/plugins.vim
set viminfo+=n~/.vim/viminfo

""""" General
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Backspace in insert mode
set backspace=indent,eol,start

""""" Interface
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Hide mode such as ---INSERT--- (already in lightline theme)
set noshowmode

" Height of the command bar
set cmdheight=2

" Always show the status line
set laststatus=2

" Line numbers and color of its gutter
set number
highlight LineNr ctermfg=238 ctermbg=233 gui=NONE guibg=NONE

""""" Colors & Font
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enable syntax highlighting
syntax enable
set background=dark

""""" Text
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use spaces instead of tabs
set expandtab

" 1 tab == 4 spaces
set shiftwidth=4
set tabstop=4
```

As you can see we have some plugin specific settings and also a new file we haven't created yet. `vimrc` will contain all our configuration but due to the large amount of plugins we need a plugin manager for our plugins. We'll be using `vim-plug`, a minimalist plugin manager that is easy to set up. So let's create the new file first.

```bash
mkdir ~/.dotfiles/vim
touch ~/.dotfiles/vim/plugins.vim
``` 

Add this content to the file. These are what plugins we want to be installed.

```bash
call plug#begin('~/.vim/plugged')

    " Lightline Statusline
    Plug 'itchyny/lightline.vim'

call plug#end()
```

Then we install `vim.plug`

```bash
mkdir ~/.vim/autoload
cd ~/.vim/autoload
curl -O https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Open vim by simply typing `vim` in the terminal and then enter `:PlugInstall`. This will install all our plugins we added to `~/.dotfiles/vim/plygins.vim`.

That's it, vim looks and works a little better but you can modify it however you want. Just enter `:PlugInstall` for installing your new plugins.

### Install ruby with rbenv

MacOS already has Ruby installed but at the time of this writing it is quite old, so we need a newer version. We could just install the latest version with brew but sometimes our project needs an older version of Ruby, here's where `rbenv` come in handy.

`rbenv` will allow us to easily switch between Ruby versions, both per project and globally.

```bash
brew install rbenv
```

Because we are using zsh we need to add this to the end of our `.zshrc`. This will add rbenv to our path and also some autocompletion and rebuilding shims:

```bash
eval "$(rbenv init -)"
```

Restart your terminal and type `echo $PATH`, the first path you see should be the `rbenv shims`, like this:

```bash
$ echo $PATH
/Users/username/.rbenv/shims:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

To check in more detail you can run this script:

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

#### Installing ruby versions

To list (the many) available ruby version to install we run:

```bash
rbenv install -l
```

So lets say we want to install ruby 2.6.3 and use it globally:

```bash
rbenv install 2.6.3
rbenv global 2.6.3
```

If you type `ruby --version` you'll see our new version being used. We can also set a version locally per project if we need by installing that version and then typing `local` instead of `global` in the root of the project.

Now we can install gems like `gem install bundler`. And they are all version specific so they change when we switch between versions. 

That's it! Very useful and simple to use. If you want to see more commands, take a look at the [command reference](https://github.com/rbenv/rbenv#command-reference).

### Install node with nvm

Clone `nvm-zsh` to our `oh-my-zsh` custom plugins folder.

```bash
git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm
```

Add `zsh-nvm` first to our plugins in the `.zshrc` file in case other plugins have node/npm as a dependency. We'll also add the nvm plugin for autocompletion

```bash
plugins=(zsh-nvm ...)
```

Restart the terminal and nvm will do a first-time-install. You can always do an upgrade of nvm simply by typing `nvm upgrade`.

Now we can install any version of node. So let's contradict all this version talk by installing the latest version 😆

```bash
nvm install node
```

Every time you open a terminal window nvm will load together with the chosen node version. This is actually very time consuming (a couple of 100 ms to several seconds on slower machines) and if you often open new terminal windows rather than having them open all the time you should consider lazy-loading nvm. When lazy-loading nvm it will be loaded first when needed and can be achieved by setting a variable in our `.zshrc`.

```bash
export NVM_LAZY_LOAD=true
```

## Organizing git repos

Nothing special here but this is how I organize my git repositories, both personal and professional.

I have created a directory named Project in my home folder, `~/Projects`, and have one directory for personal and one for work related repos.

```bash
Projects
|-- personal
|   |-- dotfiles
|   |-- movie-tracker
|   |   |-- movie-tracker-frontend
|   |   `-- movie-tracker-backend
|-- work
|   |-- nasa
|   |   |-- space-shuttle-program
|   |   `-- houston-sound-board
|   |-- apple
|   |   `-- new-iphone-design
```