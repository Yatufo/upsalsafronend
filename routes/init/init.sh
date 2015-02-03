//  to export the data the command mongoexport should be used like the next example
//	mongoexport -h localhost:27017 -c categories -d upsalsa
// node routes/init/init-locations.js 


echo "Importing locations: " 
mongoimport -h localhost:27017 -c locations -d upsalsa --file locations.json 
mongoimport -h localhost:27017 -c categories -d upsalsa --file categories.json 
