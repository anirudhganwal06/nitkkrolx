const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);