---
layout: post
title: Working with multiple git services simultaneously
tags: ['git']
---

If you have your git repositories spread across multiple git services, like GitHub for work and GitLab for personal, you
can run into problems with your git credentials. Especially if you are using different email addresses, such as the
privacy addresses provided by the services. The solution is simple and doesn't require many lines in the terminal.

Cloning public repositories usually works out of the box but pushing and working with private repositories don't.

The solution is to set up your global git config with just one of your services, preferably your personal one so you
don't accidentally push to work. Or the one you use most frequently. Then the repositories that differs will get a local
config.

Let's say that GitLab is our preferred service, so we put those credentials in our global config.

```shell
git config --global user.name "Erik Samuelsson"
git config --global user.email "xxx@users.noreply.gitlab.com"
```

All repositories on your system will get these credentials as default.

When cloning a project from GitHub we simply need to change the credentials just for that repository.

```shell
git clone git@github.com:user/project.git
```

Then cd into the folder and type:

```shell
git config user.name "Mr X"
git config user.email "yyy@users.noreply.github.com"
```

Now you use GitLab like before with all your repos but this particular project will use the correct GitHub credentials.
You can also set up and use different SSH keys for the different services, which you can read more about
[here]({{ site.baseurl }}{% post_url 2018-11-08-generate-and-organize-ssh-keys-on-mac %}).