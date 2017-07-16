#!/bin/sh

IMAGE_PATH=$1
CONTAINER_NAME="frontend"

docker container rm -f $CONTAINER_NAME
docker load -i $IMAGE_PATH
docker run --name $CONTAINER_NAME --detach -it -p 80:80 artane/$CONTAINER_NAME
