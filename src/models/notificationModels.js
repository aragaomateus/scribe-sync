const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['contributionRequest', 'contributionOutcome'],
        required: true
    },
    contributionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution'
    },
    paperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper'
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
