const express = require('express');
const router = express.Router();
const Paper = require('../models/paperModels');

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


router.delete('/papers/:id', async (req, res) => {
    try {
        const paper = await Paper.findByIdAndDelete(req.params.id);
        if (!paper) return res.status(404).send('Paper not found');
        res.send(paper);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;


