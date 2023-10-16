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
    contributions: [{
        content: String,
        contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'approved', 'rejected'] },
        createdAt: { type: Date, default: Date.now }
    }],
    imageUrl: String
    

    // ... any other fields
});

const Paper = mongoose.model('Papers', paperSchema);
module.exports = Paper;
