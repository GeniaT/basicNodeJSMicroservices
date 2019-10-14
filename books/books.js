const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config(); //responsible for reading the .env file

require('./Book')
const Book = mongoose.model('Book') //to move later, just used by multiple routes now.
const app = express()
let db; //is set with the response when attempting to login to DB. 
const ObjectId = require('mongodb').ObjectID; //to be able to search by _id from DB

//to parse the body sent in API calls.
app.use(express.json())

// Initialize connection once
MongoClient.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
console.log(process.env)
if(err) throw err;

  console.log("connected... ")
  db = client.db('books-service');
    // Start the application after the database connection is ready
    app.listen(4545, () => {
        console.log("Up and running - books service")
    })
});

//ROUTES
app.get('/', (req, res) => {
    res.send('This is our main endpoint')
})

app.post('/book', (req, res) => {
    const Book = mongoose.model('Book')
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    //create the book before saving it
    const book = new Book(newBook)

    db.collection('books').insertOne(book).then((data) => {
        console.log("New book created!")
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
    res.send("new book created with success"); //finish the request, otherwise the postman request would hang
})

app.get('/books', (req, res) => {
    db.collection('books').find().toArray().then((books) => {
        res.json(books)
        console.log(books)
    }).catch((err) => {throw err})
})

app.get('/book/:id', (req, res) => { 
    const { id } = req.params
    db.collection('books').findOne({"_id": ObjectId(id)}).then(book => {
        console.log("book: ", book)
        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404)
        }
    })
})

app.delete('/book/:id', (req, res) => {
    const { id } = req.params
    db.collection('books').findOneAndDelete({"_id": ObjectId(id)}).then(book => {
        res.send("Book removed")
    }).catch(err => {
        if (err) {throw err};
    })
})

