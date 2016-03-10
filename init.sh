#!/bin/bash

export AWS_ACCESS_KEY_ID=AKIAIMKUJAVKMMFQDQYA
export AWS_SECRET_ACCESS_KEY=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
export FRONTEND_SERVER=192.168.2.11:5000
export MONGO_CONNECTION=mongodb://mongo:27017
export S3_BUCKET=salsa.local

docker-compose up -d & grunt
