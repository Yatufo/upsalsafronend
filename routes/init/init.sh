//  to export the data the command mongoexport should be used like the next example
//	mongoexport -h localhost:27017 -c categories -d upsalsa
// node routes/init/init-locations.js 


echo "Importing locations: " 
mongoimport -h localhost:27017 -c locations -d upsalsa --file routes/init/locations.json 
mongoimport -h localhost:27017 -c categories -d upsalsa --file routes/init/categories.json 

mongoimport -h ds031641.mongolab.com:31641 -c categories -d heroku_app31647259 --file routes/init/categories.json -u admin -p

