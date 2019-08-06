---
title: "Add HTTPS to Nginx blocks with Let's Encrypt"
date: '2018-11-19'
categories: ['tools']
tags: ['security', 'https', 'nginx', 'web server']
thumbnail: '../../thumbnails/nginx.png'
---

Browsing the web unencrypted with only HTTP is not recommended anymore and Google recently started to mark all sites without SSL as “not secure” in their browser Chrome. Adding a certificate to your site used to cost money and often meant a lot of work setting up and renew it regularly. But with *Let’s Encrypt* it’s the opposite and there really is no excuse for not using HTTPS on your sites anymore.

![Logo of Let's Encrypt](./lets_encrypt.png)

## What is Let’s Encrypt?

This is best described by Let’s Encrypt themselves on their homepage, specifically:

> Let’s Encrypt is a free, automated, and open certificate authority (CA), run for the public’s benefit. It is a service provided by the [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).
>
> We give people the digital certificates they need in order to enable HTTPS (SSL/TLS) for websites, for free, in the most user-friendly way we can. We do this because we want to create a more secure and privacy-respecting Web.
> The secret to creativity is knowing how to hide your sources. 
>
> &mdash; <cite>[Let's Encrypt][1] 2018-11-19</cite>

[1]:https://letsencrypt.org/about/

So instead of paying for your certificates and manage them yourself you can use Let’s Encrypt together with *Certbot*, a client for fetching and deploying SSL certificate automatically.

## Install Certbot

Here I’m using *Ubuntu 18.04* and logged in with an account with root privileges. Certbot is available in the default Ubuntu repositories but the developers' own repository tend to be more up-to-date.

We’ll add the new repository with:

```shell
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

After that we can install Certbot and get the latest, stable version. This is for Nginx.

```shell
sudo apt-get install python-certbot-nginx 
```

## Adding certificates to your sites

Adding a new certificate to a block (site) in Nginx is very easy. It’s just one command for generating, adding to block and enabling auto renewal. Make sure the blocks enabled, otherwise Certbot won't find them.

`sudo certbot --nginx -d example.com -d www.example.com`

Here we are obtaining a certificate and adding it to `example.com` and `www.example.com` as well as automatically setting up everything behind the scenes. The command checks the Nginx blocks configurations for the `server_name` line so you need to make sure they’re the same before adding the cert, like this:

```
[...]
    server_name example.com www.example.com;
[...]
```

If this is your first time running Certbot you will need to agree to the T&S and register an email address. You will then be asked if you want to redirect all HTTP traffic to HTTPS, which probably is the case if you don’t have an old site that doesn’t support encrypted traffic everywhere.

To see the configuration added to your site you can check out the Nginx block configuration by typing:

```shell
vim /etc/nginx/sites-available/example.com
```

### Test your certificates

We need to make sure that everything is working properly before relaxing and forgetting about SSL certificates (that’s a
good thing, it works all by itself now):

```shell
sudo certbot renew --dry-run
```

This will simulate a certificate renewal and hopefully you’ll get no errors. 

When your site is live you can also test the certificates on [SSL Labs](https://www.ssllabs.com/ssltest/).

## Remove issued certificates for a domain

If you don’t want to use one of the issued certificates for a domain anymore it’s easy to remove it.

You can type `sudo certbot delete` and you’ll get a list of deletable certificates.

```
Which certificate(s) would you like to delete?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: example.com
2: about.example.com
3: blog.example.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):
```

Just type the index number  and press enter. 

You can also delete a certificate directly by typing it like this:

```shell
sudo certbot delete --cert-name about.example.com
```

If you still want to use the site you should make sure the configuration under `/etc/nginx/sites-available` is still valid and doesn't contain anything related to the certificate. 
