Install 
	MondoDB -	https://www.mongodb.org/
	Node 	-	https://nodejs.org/en/download/

Download dependencies.

```npm install```

This will also resolve the client dependencies and do other setup tasks, check package.json.

Initialize the database.

```./run.sh init``` only works for dev database

This will import the necessary data to the DEVELOPMENT database.

Start the Server.

```npm start```

By default everything runs in DEVELOPMENT mode, if you want to have PRODUCTION setup change the

```export DEPLOY_ENVIRONMENT=prod``` or ```export DEPLOY_ENVIRONMENT=dev``` respectively
