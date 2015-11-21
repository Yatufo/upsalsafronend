#### Install Dependencies
* [Node](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/)


#### Run backend with Docker
To be able to download the docker image for the backend it's necessary to login:

```
docker login
```

```
docker run -d --name upsalsa-api \
-e "DEPLOY_ENVIRONMENT=prod" \
-e "MONGO_CONNECTION=mongodb://api:api@ds053794.mongolab.com:53794/upsalsa-dev" \
-p 3002:5000 upsalsa/upsalsa-api
```

[OPTIONAL]To be able to retrieve the uploaded images and show them in the app it's necessary to run the image server

```
docker run -d --name image-server \
-p 3001:3001 \
-e AWS_ACCESS_KEY_ID=AKIAJ66NQ6MUCMHT3C5Q \
-e AWS_SECRET_ACCESS_KEY=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 \
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
