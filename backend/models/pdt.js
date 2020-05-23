const mongoose = require('mongoose');

let Pdt = new mongoose.Schema({
    username: {
        type: String
    },
    pdtname: {
        type: String
    },
    price: {
        type: Number 
    },
    quantity: {
        type: Number
    },
    totcnt: {
        type: Number
    },
    pdtstatus: {
        type: String 
    },
    rating: {
        type: Number
    },
    totreviews: {
        type: Number
    },
    pdtrating: {
        type: Number
    },
    reviews: {
        type: String 
    },
    pdttotreviews: {
        type: Number
    }
});

module.exports = mongoose.model('Pdt', Pdt ,'pdt');
