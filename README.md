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

### Start
Run the backend in the background and then the frontend.
```
  npm start
```

### Sample Data
Initialize the data (mongo backend must be running)
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
