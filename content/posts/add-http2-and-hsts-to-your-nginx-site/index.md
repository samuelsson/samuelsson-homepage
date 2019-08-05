---
title: 'Add HTTP/2 and HSTS to your Nginx site'
date: '2018-11-27'
categories: ['tools']
tags: ['security', 'https', 'nginx', 'web server']
thumbnail: '../../thumbnails/nginx.png'
---

HTTP/2 has only been out a for a few years but it is certainly time to activate it on your sites now. Compared to the old HTTP 1.1 there are many pros. Requests are downloaded parallel instead of in a queue, greatly improving speed and performance for content heavy sites. As well as compressed headers and pages being transferred as binary instead of text, for example.

Open the server block config for your site:

```shell
sudo vim /etc/nginx/sites-available/example.com
```

There you need to find the listen arguments that looks like this:

```
[...]
    listen [::]:443 ssl ipv6only=on; 
    listen 443 ssl; 
[...]
```

Add `http2` to these lines so it looks like this:

```
[...]
    listen [::]:443 ssl http2 ipv6only=on; 
    listen 443 ssl http2; 
[...]
```

This will tell the browser to use HTTP/2 instead of HTTP 1.1, as long as the client supports it.

After editing Nginx configuration files you should always check if they are valid and without errors. To do that we type `sudo nginx -t`.

## Update the ciphers

The ciphers initially added by Certbot (located at `/etc/letsencrypt/options-ssl-nginx.conf`) are not secure enough for HTTP/2 and we need to add other ciphers.

Let’s stop using the one from Certbot and add a new one by editing our block config file.

```shell
sudo vim /etc/nginx/sites-available/example.com
```

Then we need to comment out or remove the line including the Certbot ciphers and then define our own. We can do that in the same file at the moment

```shell
# include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
```

And once again we need test our config with `sudo nginx -t`.

If everything went well and you didn’t get any errors you need to reload Nginx.

```shell
sudo systemctl reload nginx
```

To test that everything is working correctly we can type `curl -I -L https://example.com` in any terminal. You should see something like this:

```
HTTP/2 200
server: nginx
date: Tue, 20 Nov 2018 12:10:00 GMT
content-type: text/html
content-length: 6704
last-modified: Tue, 20 Nov 2018 12:00:00 GMT
etag: "123aaa456-10ab"
accept-ranges: bytes
```

The first line indicates that the response returned a 200 (success) over HTTP/2.

## Enable HSTS

Normally a first-time user would access your site with a normal HTTP request, just typing the URL in the address bar without specifying a protocol. That request will point to port 80 over HTTP and the web server will then redirect to HTTPS with a 301. This could potentially be vulnerable to a man-in-the-middle (MITM) attack. We can avoid those redirects by adding a *HTTP Strict Transport Security* header. This will instead result in a 307, an *Internal Redirect*, to HTTPS. Much safer 👊🏻

Open `/etc/nginx/sites-available/example.com` and add this inside the server block (the main block with the SSL config):

```
add_header Strict-Transport-Security "max-age=15768000; includeSubDomains" always;
```

* `max-age` tells the browser to cache this, in seconds. 6 months in this case.
* `includeSubDomains` tells  the browser that this also applies to all sub domains, such as `www.example.com`.
* `always` means the header is set for all responses, including errors.

And by now you know the deal, `sudo nginx -t` and `sudo systemctl reload nginx`.

Visit your site and check if everything is working. Open the *dev tools* and under the network tab you should now see that requests are sent over HTTP/2 instead.

You can also test your site over at [SSL Server Test](https://ssllabs.com/ssltest/). You should get an A+ score now with HTTP/2 and HSTS.

![SSL Server Test with A+ score](ssl_server_test_a_plus.png)
