#### Install Dependencies
* [Node](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/)

From the root folder:

```npm install```

## Run backend with Docker
To be able to download the docker image for the backend it's necessary to login:

```
docker login
```


Create the env variable to run the server
```
export AWS_ACCESS_KEY_ID=AKIAIMKUJAVKMMFQDQYA
export AWS_SECRET_ACCESS_KEY=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
export FRONTEND_SERVER=192.168.2.11:5000
export BACKEND_NETWORK=salsanet
export MONGO_CONNECTION=mongodb://localhost:27017
export S3_BUCKET=salsa.local
export PRERENDER_TOKEN=invalid
docker network create --driver bridge $BACKEND_NETWORK
```


### Start
```
  npm start
```

### Initialize the data (mongo backend must be running)
```
  mongorestore
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
export AWS_ACCESS_KEY_ID=productionkey
export AWS_SECRET_ACCESS_KEY=productionsecretkey
```

```
grunt publish
```
