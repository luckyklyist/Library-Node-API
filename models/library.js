const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now()
    },
    blocked_to:{
        type:Array,
        default:[]
    }
}, { timestamps: true });

const Library = mongoose.model('library', librarySchema);

module.exports = Library;
