const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    title: String,
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    },
    author_name: String,
    summary: String,
    topics: [],
    content:String,
    contributions: [],
    imageUrl: String
    

    // ... any other fields
});

const Paper = mongoose.model('Papers', paperSchema);
module.exports = Paper;
