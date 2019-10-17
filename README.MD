### First basic exercice on nodejs microservices + docker 
- We have 3 services here with his own dependencies and API. Books, customers and orders which communicates with the 2 others. 
- Simple CRUD operations have been set up on mongoDB.
- Docker setup for each service and a `docker-compose.yaml` file to build them all together. 

### What you need
- nodejs installed + Postman to run requests other than /GET to your app.
- Optional: Have Docker installed and being logged in to it to make the setup quicker. 

### To run this code locally
- Get access to MongoDB Atlas by creating an account.
- Create the 3 DBs: "books-service", "customers-service" and "orders-service" in mongoDBAtlas.
- From Overwiew in MongoDB Atlas pannel, click on connect and get your link to be able to connect your app to the database, should look like "mongodb+srv://`user`:`password`>@cluster0-ug8mm.mongodb.net/test?retryWrites=true&w=majority"
- Use that link in each of your services, books, customers and orders when connecting to the database in "MongoClient.connect(`Your url string`, { useNewUrlParser: true, useUnifiedTopology: true }"
- Clone this folder, run `cd basicNodeJSMicroservices` then `docker-compose build` and finally `docker-compose up -d`

Have no Docker? 
- Run `npm install` from books, customers and orders folder so 3 times in total
- Then from the 3 folders, run `npm run serve` so 3 times from `/orders`, `/customers` and `/books`.

You should now be able to run the app and perform basic API calls. If in doubt the format of the request, check the related service. It should be self explanatory. 

