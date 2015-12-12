#### Install Dependencies
* [Node](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/)

From the root folder:

```npm install```

#### Run backend with Docker
To be able to download the docker image for the backend it's necessary to login:

```
docker login
```

```
export AWS_ACCESS_KEY_ID=AKIAIMKUJAVKMMFQDQYA
export AWS_SECRET_ACCESS_KEY=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
export FRONTEND_SERVER=192.168.2.11:5000
export BACKEND_NETWORK=salsanet
export MONGO_CONNECTION=mongodb://localhost:27017
export S3_BUCKET=salsa.local
docker network create --driver bridge $BACKEND_NETWORK
```

```
  docker-compose up -d
```

#### Run the app

```
  grunt
```

#### Open in Browser.

Go to (http://localhost:3002/)


#### Domain.
The authentication requires a proper domain to work, so update your hosts file (/etc/hosts) to add the salsa.local domain

```
127.0.0.1 salsa.local localhost
```

Go to (http://salsa.local:3002/)


#### Deploy to production.

To upload the generated static files to S3:

```
export AWS_ACCESS_KEY_ID=productionkey
export AWS_SECRET_ACCESS_KEY=productionsecretkey
```

```
grunt publish
```
