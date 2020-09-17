const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for library
const librarySchema = new Schema({
    title: {type: String, required: true},
    review: {type: String}
})

module.exports = Library = mongoose.model('Books',librarySchema);