const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const Notification = require('../models/notificationModels');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            topicsOfInterest: req.body.topicsOfInterest
        });

        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Check if the user exists
        console.log("Login request received with data:", req.body);

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log('Email or password is wrong')
          return  res.status(400).send('Email or password is wrong');
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log("wrong password");
            res.status(400).json({ message: 'Email or password is wrong' });
        } else {            
            console.log("successful");
            // Return user details on successful login
            res.json({ 
                message: 'Logged in successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    topicsOfInterest: user.topicsOfInterest
                }
            });
        }

        // In a real-world scenario, you'd also generate a JWT token here and send it to the client

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/notifications/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;
