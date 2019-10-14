const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config(); //responsible for reading the .env file
const axios = require('axios')
require('./Order')
const Order = mongoose.model('Order')

const app = express()
let db;
const ObjectId = require('mongodb').ObjectID;

app.use(express.json())

// Initialize connection once
MongoClient.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if(err) throw err;

  console.log("connected... ")
  db = client.db('orders-service');
    // Start the application after the database connection is ready
    app.listen(7777, () => {
        console.log("Up and running - orders service")
    })
});

app.post('/order', (req, res) => {
    const order = new Order({
        CustomerID: ObjectId(req.body.CustomerID),
        BookID: ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    })
    db.collection('orders').insertOne(order).then(() => {
        res.send('Order created !')
    }).catch(err => {
        if (err) {throw err}
    })
})

app.get('/orders', (req, res) => {
    db.collection('orders').find().toArray().then(data => {
        res.json(data)
    })
})

app.get('/order/:id', (req, res) => {
    const { id } = req.params;
    db.collection('orders').findOne({"_id": ObjectId(id)}).then(order => {
        if (order) {
            axios.get('http://localhost:5555/customer/' + order.CustomerID).then((response) => {
                let orderObject = {
                    customerName: response.data.name,
                    bookTitle: ''
                }
                axios.get('http://localhost:4545/book/' + order.BookID).then(response => {
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                })
            })
        } else {
            res.send("Invalid Order")
        }
    })
})