const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;

//if we define ObjectID on type, it has to be a valid ObjectID from the DB
mongoose.model('Order', {
    CustomerID: {
        type: ObjectId,
        require: true
    },
    BookID: {
        type: ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})