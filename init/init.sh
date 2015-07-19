#!/bin/bash

# to export the data the command mongoexport should be used like the next example
# mongoexport -h localhost:27017 -c categories -d upsalsa

echo "Importing locations: "
node init/LocationsImportFromCSV.js

echo "Importing categories: "
mongoimport -h localhost:27017 -c categories -d upsalsa --file init/categories.json

# mongoimport -h ds031641.mongolab.com:31641 -c categories -d heroku_app31647259 --file routes/init/categories.json -u admin -p
# mongoimport -h ds031641.mongolab.com:31641 -c locations -d heroku_app31647259 --file routes/init/locations.json -u admin -p
