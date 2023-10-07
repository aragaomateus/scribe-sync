const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    title: String,
    author: String,
    summary: String,
    topics: [String],
    contributions: Number,
    imageUrl: String,
    // ... any other fields
});

const Paper = mongoose.model('Papers', paperSchema);
module.exports = Paper;
