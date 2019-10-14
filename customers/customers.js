const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config(); //responsible for reading the .env file

require('./Customer')
const Customer = mongoose.model('Customer')

const app = express()
let db;
const ObjectId = require('mongodb').ObjectID;

app.use(express.json())

// Initialize connection once
MongoClient.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if(err) throw err;

  console.log("connected... ")
  db = client.db('customers-service');
    // Start the application after the database connection is ready
    app.listen(5555, () => {
        console.log("Up and running - customer service")
    })
});

//ROUTES
app.get('/', (req, res) => {
    res.send('This is our main endpoint')
})

app.post('/customer', (req, res) => {
    const Customer = mongoose.model('Customer')
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    const customer = new Customer(newCustomer)
    db.collection('customers').insertOne(customer).then(() => {
        console.log("New customer created")
    }).catch((err) => {
        if (err) {throw err}
    })

    res.send("new customer has been created")
})

app.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.collection('customers').findOne({"_id": ObjectId(id)}).then((customer) => {
        res.json(customer);
    }).catch((err) => {
        if (err) {throw err}
    })
})

app.get('/customers', (req, res) => {
    db.collection('customers').find().toArray().then(customers => {
        res.json(customers)
    }).catch((err) => {
        if (err) {throw err}
    })
})

app.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.collection('customers').findOneAndDelete({"_id": ObjectId(id)}).then((customer) => {
        res.send('customer has been deleted');
    }).catch((err) => {
        if (err) {throw err}
    })
})