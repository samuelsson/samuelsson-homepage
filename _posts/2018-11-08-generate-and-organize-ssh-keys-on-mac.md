---
layout: post
title: Generate and organize SSH keys on Mac
tags: ['ssh', 'keys', 'mac']
---

If you've never heard about SSH keys and are still using passwords when logging in to your remote servers you're in for
a treat. Or maybe you already know about SSH keys but aren't organizing them in a good way. Anyway this post will make
you an SSH key pro and you will have full control over all your keys.

If you want to know more about how SSH keys work there are plenty of guides out there. But a good and simple example I
like is to think of the server as a locker. You can, and should, put a padlock on the locker to keep bad persons out of
it. If you choose a padlock with a code it's very convenient and you can access it whenever you want, even if you don't
have a key. Unfortunately someone can see the correct code when it's being entered or even guessed if given enough
tries. If you instead use a real key it is much safer because only those with a correct key can open the locker. An SSH
key is exactly that, but just a file on your computer, that will unlock and grant you access to different hosts.

It would be easy to only generate a single key and use it for all servers but if you lose the key you would put all the
servers at risk. If using the same metaphor as above you then need to change the padlocks on all lockers. If only
storing your keys in a single place (i.e. your laptop) it is not as important compared to storing them on many (phone,
tablet, work computer and other laptops). That's an increased risk of losing one or many of your keys. For the sake of
this guide we will generate and organize one for each host.

In this guide we will create separate keys for three different hosts/environments. We will be using a real world
example so the hosts will be _GitLab_, _VPS_ and your _LAN_.

# Generating the keys

We'll start with the key for GitLab. The only thing you need to do to generate a key is to open your terminal and
type this command:

`ssh-keygen -t rsa -b 4096 -C "An optional comment"`

This generates a new key and as a comment you can add something descriptive for what it's going to be used for or the
account email for example.

You will be prompted to answer some question after entering the command, lets see with what.

* The first one is where you want to save the file and with what filename. We want to save it to the default location
(home folder) but we want to change the name so we can identify it being used for GitLab. We'll do that by typing:
`~/.ssh/id_rsa_gitlab`.

* The other one is an optional password when using the key, adding an extra layer of security if someone steals it. This
is highly recommended so just do it 👍🏻. You will need to enter it twice and nothing will be displayed in the terminal
while typing it.

To make sure your key was generated successfully type `ls -l ~/.ssh`. You should see something similar to this:
{% highlight bash linenos %}
-rw-------   1 samuelsson  staff  3326 Jan  1 10:15 id_rsa_gitlab
-rw-r--r--   1 samuelsson  staff   751 Jan  1 10:15 id_rsa_gitlab.pub
{% endhighlight %}

You will now see two files. The first file, named `id_rsa_gitlab` is your private key. Protect it with your life, or at
least keep it safe in your ssh folder and don't share it. The other file, `id_rsa_gitlab.pub` is your public key. The
public key can be shared and uploaded to the host, so the host knows you can use your private key to connect to it. Like
a key and a keyhole.

Now do the same thing again but for the other hosts, we'll call the new keys `id_rsa_lan` and `id_rsa_do` (do for
DigitalOcean).

If you run `ls -l ~/.ssh` you should see six files:
{% highlight bash linenos %}
-rw-------   1 samuelsson  staff  3326 Jan  1 10:20 id_rsa_do
-rw-r--r--   1 samuelsson  staff   751 Jan  1 10:20 id_rsa_do.pub
-rw-------   1 samuelsson  staff  3326 Jan  1 10:15 id_rsa_gitlab
-rw-r--r--   1 samuelsson  staff   751 Jan  1 10:15 id_rsa_gitlab.pub
-rw-------   1 samuelsson  staff  3326 Jan  1 10:25 id_rsa_lan
-rw-r--r--   1 samuelsson  staff   751 Jan  1 10:25 id_rsa_lan.pub
{% endhighlight %}

# Organizing the keys

To organize our keys and set what hosts they should be used for we need a config file in our SSH folder. We create and
start editing the file by typing `vim ~/.ssh/config`. This will open an editor where we first will add the configuration
for DigitalOcean.

{% highlight bash linenos %}
# Personal homepage on DigitalOcean
Host homepage 10.123.123.123 example.com
    User john
    Hostname 10.123.123.123
    Port 12312
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa_do
{% endhighlight %}

There are a lot of properties here, I'll desbribe each one of them.

* `Host` - This is what you will call your host when connecting to it over SSH, this can be anything actually but should
be something that is unique for the host. Like a label and you can add as many you like, separated with a space.

* `User` is what remote user you want to authenticate as when connecting to the server. If left out you need to specify
it when connecting instead.

* `Hostname` is the real address used for connecting to the host. Because we've specified "homepage" as a custom host
our client needs to know what it really should point to. This could be an IP address or a domain.

* `Port` is only needed if the SSH server is listening on another port than the default one, port 22. So normally you
can leave this out unless you've changed the port on the server.

* `AddKeysToAgent` - To be able to use the key when connecting to servers we need to add it to the SSH Agent. The agent
keeps track of all our keys and their passphrases so we don't need to manually add the key every time we reboot.

* `UseKeychain` - For convenience we can save the key passphrase in the Mac OS keychain so we don't need to type it
every time we want to use it. Not mandatory but it will make your life easier if connecting to many servers.

* `IdentityFile` is the path to the private key we want to use for this particular host. So we are using the correct key
when connecting and not just the first one in the SSH folder.

Adding a Host for GitLab is pretty much the same expect the User is the same for everyone and the HostName is not an IP.
This will be used when working with git and not connecting to a server directly.

{% highlight bash linenos %}
# GitLab with all my cool repositories
Host gitlab.com
    User git
    Hostname gitlab.com
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa_gitlab
{% endhighlight %}

Lets add some configurations for the LAN now. This is a little more fun, some new stuff here.

{% highlight bash linenos %}
# My local servers and devices at home
Host homeserver.local 192.168.1.20
    User server
    HostName 192.168.1.20
    Port 22222

Host htpc.local 192.168.1.21
    User kodi
    HostName 192.168.1.21

Host *.local 192.168.1.*
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa_local
{% endhighlight %}

Here we've created three hosts. The first two are for actual hosts with specific properties like username and their IP
addresses, nothing new. Instead of specifying properties that are the same for all hosts we now have a fallback one.
When connecting to a certain host all configs that match the Host pattern will be loaded. That's why we need those
wildcards, `*`.

## When connecting over SSH

If connecting to a host without this set up you would need to type something like this to connect to your host:

`ssh john@10.123.123.123 -i ~/.ssh/id_rsa_do -p 12312`

Then followed by the password for your private key. Not easy to remember or type, right? After our configuration it is
much easier to connect, we only need to type this:

`ssh homepage`

Everything is taken care of by our configuration. What hostname to use for "homepage" is resolved and username and port
is set. We also save the password for the key so we don't need to type it every time.

When connecting to a local server in you network you can of course add and use a Host like we did with
`homeserver.local` but because we have a wildcard you don't need to specify all hosts in your config. You still need to
specify a User and a valid HostName such as the IP (or a .local address if setup in your DNS settings) when connecting
though. Like this:

`ssh bob@192.168.1.22` or `ssh bob@toothbrush.local`

# Backing up the keys

As I've mentioned before you should keep those private keys protected and safe, they are called private for a reason.
That means you **should not**:

* Upload them to a git repository.
* Store them on Google Drive or similar.
* Put them in a password manager if you also save the passphrases there.
* Send them to yourself in a way that stores them remotely (like e-mail).
* Traditional backup solutions like external hard drives and USB flash drives.

What you should do is put them on an encrypted flash drive and store it in a safe. If that's not possible you can store
them in your password manager as long as you don't also store the passphrases there as well.