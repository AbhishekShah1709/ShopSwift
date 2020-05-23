const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    username: {
        type: String
    },
    pdtname: {
        type: String
    },
    pdtstatus: {
        type: String 
    },
    cnt: {
        type: Number
    },
    pdtowner: {
        type: String
    },
    quantity: {
        type: Number 
    },
    totcnt: {
        type: Number 
    }
});

module.exports = mongoose.model('Order', Order, 'order');
