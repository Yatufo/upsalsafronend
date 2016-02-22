#!/bin/bash

export AWS_ACCESS_KEY_ID=AKIAIMKUJAVKMMFQDQYA
export AWS_SECRET_ACCESS_KEY=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
export FRONTEND_SERVER=192.168.2.11:5000
export BACKEND_NETWORK=salsanet
export MONGO_CONNECTION=mongodb://localhost:27017
export S3_BUCKET=salsa.local
export PRERENDER_TOKEN=invalid
docker network create --driver bridge $BACKEND_NETWORK

docker-compose up -d & grunt
