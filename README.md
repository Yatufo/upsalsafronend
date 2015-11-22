#### Install Dependencies
* [Node](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/)


#### Run backend with Docker
To be able to download the docker image for the backend it's necessary to login:

```
docker login
```

```
export AWS_ACCESS_KEY_ID=AKIAIMKUJAVKMMFQDQYA
export AWS_SECRET_ACCESS_KEY=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
```

```
docker run -d --name upsalsa-api \
-e "DEPLOY_ENVIRONMENT=dev" \
-e "MONGO_CONNECTION=mongodb://api:api@ds053794.mongolab.com:53794/upsalsa-dev" \
-e AWS_ACCESS_KEY_ID=$AWS_SECRET_ACCESS_KEY \
-e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
-p 3002:5000 upsalsa/upsalsa-api
```

[OPTIONAL]To be able to retrieve the uploaded images and show them in the app it's necessary to run the image server

```
docker run -d --name image-server \
-p 3001:3001 \
-e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
-e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
-e AWS_REGION=us-east-1 \
-e S3_BUCKET=salsa.local \
brendanyounger/image-resizer
```


#### Run the app

```
  grunt
```

#### Open in Browser.

Go to (http://localhost:5000/)


#### Domain.
The authentication requires a proper domain to work, so update your hosts file (/etc/hosts) to add the salsa.local domain

```
127.0.0.1 salsa.local localhost
```

Go to (http://salsa.local:5000/)


#### Deploy to production.

To upload the generated static files to S3:

```
export AWS_ACCESS_KEY_ID=myaccesskey
export AWS_SECRET_ACCESS_KEY=mysecretkey
```

```
grunt publish
```
