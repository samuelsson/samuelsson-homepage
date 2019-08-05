---
title: 'Update Drone CI to latest version'
date: '2019-06-14'
categories: ['tools']
tags: ['drone', 'cicd', 'docker']
thumbnail: '../thumbnails/drone.png'
---

Drone is a great open source CI/CD running in a docker container that is both easy to use and install. Because it runs in a container and doesn’t require a lot of dependencies installed on your system it’s really easy to update to a new version.

If you haven’t installed Drone yet you can do that by reading this [post](/how-to-install-and-configure-drone-ci-on-a-self-hosted-server).

Navigate to [Docker Hub](https://hub.docker.com/r/drone/drone/tags) and check if there is a new version available. You can read the changelog at [GitHub](https://github.com/drone/drone/blob/master/CHANGELOG.md) to make sure there are no breaking changes. If you’d like to use the new version start by downloading it (we assume the latest version is 1.2.1 in this example but change accordingly).

```shell
docker pull drone/drone:1.2.1
```

When the download is complete we need to tell our startup script to use the new container instead. Open the docker-compose file for Drone.

```shell
sudo vim /etc/drone/docker-compose.yml
```

Here we need to change what image to use, we change the image property to this:

```shell
image: drone/drone:1.2.1
```

Then we simply restart Drone.

```shell
sudo systemctl stop drone
sudo systemctl start drone
```

You can then validate that everything works by either navigate to the GUI in your browser or check the status by typing:

```shell
sudo systemctl status drone
```

## Cleaning up old docker images
It can be a good idea to remove old, unused images when they are not used anymore. Drone itself doesn’t take up much disk space but because it uses all kind of images internally it can quickly grow in size. For example building a node project requires the node docker image which is around 1 GB in size. No need to save outdated images if your projects don’t need them.

You can see all images by typing:

```shell
docker images -a
```

If it doesn’t have an associated tag it usually isn’t needed and can be removed, but that is not always the case. Another application might use it as well so make sure it’s safe to remove it before you do.

To remove all danglig images (without a tag) you can do that with:

```shell
docker images purge
```

If you want to remove a single image, like the old Drone image we don’t use anymore, you can do that by removing it by the image ID. Let’s say our old Drone version, 1.2.0, we don’t use anymore has the image ID _4a2d1fc1233d_. Then we can remove it by that ID.

```shell
docker rmi 4a2d1fc1233d
```

You are now running a new version of Drone and you have so much disk space left for other cool stuff 😍
