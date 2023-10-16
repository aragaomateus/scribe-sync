const express = require('express');
const router = express.Router();
const Paper = require('../models/paperModels');
const Notification = require('../models/notificationModels');

const User = require('../models/userModels');

router.post('/papers', async (req, res) => {
    try {
        const user_id = req.body.author_id;

        // Check if the user exists
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).send('User not found');
        }

        const paper = new Paper({...req.body
        });
        console.log("Received paper data:", req.body);

        await paper.save();
        res.status(201).send(paper);
    } catch (error) {
        console.error("Error creating paper:", error);
        res.status(500).send(error.message);
    }
});


router.get('/papers', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.send(papers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/papers/:id', async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id);
        if (!paper) return res.status(404).send('Paper not found');
        res.send(paper);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/papers/createdBy/:userId', async (req, res) => {
    try {
        const papers = await Paper.find({ author_id: req.params.userId });
        res.status(200).json(papers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/papers/:id', async (req, res) => {
    try {
        const paper = await Paper.findByIdAndDelete(req.params.id);
        if (!paper) return res.status(404).send('Paper not found');
        res.send(paper);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/papers/:paperId/contributions', async (req, res) => {
    try {
        const { paperId } = req.params;
        const { userId, content } = req.body;

        const paper = await Paper.findById(paperId);
        const user = await User.findById(userId);
        if (!paper) {
            return res.status(404).send('Paper not found');
        }

        paper.contributions.push({
            content,
            contributor: userId,
            status: 'pending'
        });
        

        await paper.save();

        // Create a notification for the original author
        const notification = new Notification({
            userId: paper.author_id,  // Assuming the paper has an 'author' field pointing to the user's ID
            message: `You have a new contribution request from ${user.name}.`,  // Assuming the user has a 'name' field
            type: 'contributionRequest',
            contributionId: paper.contributions[paper.contributions.length - 1]._id,  // ID of the last contribution
            paperId: paper._id
        });

        await notification.save();

        res.status(201).json({ message: 'Contribution submitted' });
    } catch (error) {
        console.error("Error in contribution:", error);  // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
});


// Confirm a contribution
router.post('/contributions/:contributionId/confirm', async (req, res) => {
    try {
        const { contributionId } = req.params;
        const contribution = await Contribution.findById(contributionId);
        if (!contribution) {
            return res.status(404).send('Contribution not found');
        }
        contribution.status = 'confirmed';
        await contribution.save();
        res.status(200).send('Contribution confirmed');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Decline a contribution
router.post('/contributions/:contributionId/decline', async (req, res) => {
    try {
        const { contributionId } = req.params;
        const contribution = await Contribution.findById(contributionId);
        if (!contribution) {
            return res.status(404).send('Contribution not found');
        }
        contribution.status = 'declined';
        await contribution.save();
        res.status(200).send('Contribution declined');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;


