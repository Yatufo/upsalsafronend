//  to export the data the command mongoexport should be used like the next example
//	mongoexport -h localhost:27017 -c categories -d upsalsa

echo "Importing locations: " 
mongoimport -h localhost:27017 -c locations -d upsalsa --file locations.json 
