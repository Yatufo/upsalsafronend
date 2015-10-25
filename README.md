#### Install 3rd party Software
* [MondoDB](https://www.mongodb.org/)
* [Node](https://nodejs.org/en/download/)

#### Install dependencies.

```npm install```

This will also resolve the client dependencies and do other setup tasks, check package.json.

#### Initialize the database.

```./run.sh init``` only initializes the local dev database

This will import the necessary data to the DEVELOPMENT database.

#### Start the Server.

```npm start```

By default everything runs in DEVELOPMENT mode, if you want to have PRODUCTION setup change the

```export DEPLOY_ENVIRONMENT=prod``` or ```export DEPLOY_ENVIRONMENT=dev``` respectively


#### Open in Browser.

Go to (http://localhost:5000/)


#### Domain.
The authentication requires a proper domain to work, so update your hosts file (/etc/hosts) to add the salsa.local domain

``` 
127.0.0.1 salsa.local localhost
```

Go to (http://salsa.local:5000/)
