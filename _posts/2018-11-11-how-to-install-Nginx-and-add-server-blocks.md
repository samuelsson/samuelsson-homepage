---
layout: post
title: How to install Nginx and add server blocks
tags: ['nginx', 'web server']
---

If you’ve been working with web servers for a while you’ve probably heard about Apache. It was pretty much the default
solution when setting up a new site on a self hosted server a while back. The classic *LAMP stack*, an acronym for
Linux, Apache, MySQL and PHP, were used everywhere. Even though Apache definitely has its place it is pretty exhausting
to setup with a lot of configuration and for simpler projects Nginx is a nicer solution in my opinion. That doesn’t mean
Nginx is only for simple projects, of course. Both have their pros and cons but in this guide we’ll install and setup
Nginx on Ubuntu.

![Logo of Nginx](/assets/images/posts/nginx.svg)


# Install Nginx
It only takes about a minute to install Nginx and the configuration is simple and easy to understand. You should be
logged in as a non-root user with sudo privileges. Simply run these commands to install:

```bash
sudo apt update
sudo apt install nginx
```

That’s it, Nginx is installed and running, you can see if it is active by running this command:

`systemctl status nginx`

You should see something similar like this if everything went well:

`Active: active (running) since Thu 2018-11-02 22:30:00 CET; 2 days ago`

Press *Q* to close the status.

## Allow Nginx traffic in the firewall
Then we need to add a rule to UFW, the Ubuntu firewall, so our web server can receive incoming connections. We wouldn’t
get many visitors if we don’t 😉 

> **Important!** If UFW isn’t enabled and you choose to do so it’s very important that you also enable OpenSSH if you are
connected over SSH. Otherwise you will lock yourself out of your server.

When we install Nginx it automatically registers itself with UFW app list so we don’t need to add ports manually. We
simply type this:

`sudo ufw allow 'Nginx Full'`

The *Full* keyword means we open up for both HTTP and HTTPS traffic. The reason we also open for HTTP and not only HTTPS
is that we can redirect all non-encrypted traffic to our HTTPS page. You don’t need to reload UFW when adding new rules.

If you want to to see all available apps for UFW you can type `sudo ufw app list`. Here you’ll see commands for only
HTTP or HTTPS if you want that instead, as well as OpenSSH mentioned above.

Now you should be able to navigate to the external IP of your server in your browser and see a default success page.

# Adding new Nginx blocks
With Nginx blocks you can serve multiple sites on your server on the same IP address. Apache calls this *virtual hosts*
and is maybe a little more descriptive of what it is. The default block is the one you’ve already visited, the success
page. We’ll add a couple of others and disable the default on.

We’ll set up two sites in this tutorial, example.com and blog.example.com.

## Directory structure for the new blocks
You can place the files for your sites wherever you want but for simplictly we’ll use the default location, `/var/www/`.

Let’s create the new directories for our new blocks:

```bash
sudo mkdir -p /var/www/example.com/html
sudo mkdir -p /var/www/blog.example.com/html
```

Then we need to change the ownership of the directories so we can manage the files later on. You can create a user only
for this but the currently logged in user is probably fine.

```bash
sudo chown -R $USER:$USER /var/www/example.com
sudo chown -R $USER:$USER /var/www/blog.example.com
```

Then we’ll create a placeholder index.html and fill it with some text.

```bash
echo "hello" >> /var/www/example.com/html/index.html
echo "hello again" >> /var/www/blog.example.com/html/index.html
```

## Enable the blocks in Nginx
First navigate to `/etc/nginx` and type `ls -l` to se the content in that directory. There are two directories we are
going to work with here.

* `sites-available` contains all the configurations for our blocks. A rule of thumb here is one file for each block. As
the name sugests the configs placed here are not activated but rather available for us.
* `sites-enabled` are used when we want to enable a certain block and make it activated in Nginx. This directory only
contains symlinks of the directories in *sites-available*.

Lets add our first block to available-sites by typing:

`sudo vim /etc/nginx/sites-available/example.com`

And we'll add something like this:

{% highlight shell linenos %}
server {
    listen 80;
    listen [::]:80;

    root /var/www/example.com/html;
    index index.html index.htm;

    server_name example.com www.example.com;

    access_log /var/log/nginx/example.com/access.log;
    error_log /var/log/nginx/example.com/error.log;

    error_page 404 /404.html;
        location = /404.html {
            internal;
        }

    location / {
        try_files $uri $uri/ =404;
    }
}
{% endhighlight %}

* `listen` is what port we want to use, 80 is default HTTP. We’ll add HTTPS in a later step so leave it at 80 for now.
* `root` is the location of the root directory of our site, where we created the *index.html*.
* `index` is the full name of the index file used in the root directory.
* `server_name` is the domain names used for this block. This way Nginx knows which block to use when a user types a URL
in their browser. 
* `access_log` and `error_log` is used to separate the logs from the other blocks. This is optional but really
recommended to keep the logs readable.
* `error_page` is also optional if you want to display a 404 page if the original page isn’t found. Create a 404.html
file and place it in your root folder.
* `location` telling Nginx to try to serve a request as a file, then a directory or if none is found a 404.

Repeat the procedure but for the other block:

`sudo vim /etc/nginx/sites-available/blog.example.com`

## Manage separate logs for each block

Because we’ve changed the path for the logs we also need to create the new directories. 

```bash
sudo mkdir -p /var/log/nginx/example.com/
sudo mkdir -p /var/log/nginx/blog.example.com/

sudo chown -R www-data:adm /var/log/nginx/example.com/
sudo chown -R www-data:adm /var/log/nginx/blog.example.com/
```

The default logs, located under `/var/log/nginx`, rotate once every day and only the latest 14 are kept. If we don't add
a *logrotate* to our new blocks they will grow in size until our disk is full. That will happen in no time because your
sites will be very popular, right? 🤗

Let's open the logrotate config file for Nginx by typing:

`sudo vim /etc/logrotate.d/nginx`

You'll see something similar to this:

{% highlight shell linenos %}
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
            run-parts /etc/logrotate.d/httpd-prerotate; \
        fi \
    endscript
    postrotate
        invoke-rc.d nginx rotate >/dev/null 2>&1
    endscript
}
{% endhighlight %}

The first line is where the logs are located, the asterisk means all log files in the nginx folder. We added a subfolder
here so we could create new blocks for each subfolder but if all the settings are the same we can extend the current
one. We'll do that by changing the first line to this:

`/var/log/nginx/*.log /var/log/nginx/*/*.log {`

That means all log files in the nginx folder as well as all log files in sufolders one level deep. We can also change
`rotate` if we want to keep more or fewer logs and `daily` can be change to `weekly` or `monthly`, for example.

No reload is necessary because they are a scheduled work run daily with crontab. You can make sure your file pattern
matches your subfolders by typing:

`sudo logrotate /etc/logrotate.conf --debug`

## Enable the blocks and restart

Now we just need to enable our blocks by symlinking them into `sites-enabled`

```shell
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/blog.example.com /etc/nginx/sites-enabled/
```

To see if our config files are valid and don’t contain errors we can test them with:

`sudo nginx -t`

If there are no errors we’ll restart Nginx and our sites should be up and running.

`sudo systemctl restart nginx`

Next step is to enable HTTPS, which you can read about
[here]({{ site.baseurl }}{% post_url 2018-11-19-add-https-to-nginx-blocks-with-lets-encrypt %}).