const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    rollNo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    uniqid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);