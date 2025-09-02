const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Achievement = require('../models/achievements');

// Add a new achievement
router.post('/achievements', authMiddleware, async (req, res) => {
    try {
        const { title, category, date, description } = req.body;

        const newAchievement = new Achievement({
            title,
            category,
            date,
            description,
            userId: req.user._id
        });

        await newAchievement.save();
        res.status(201).json({ message: 'Achievement added successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// Get all achievements for the logged-in user
router.get('/achievements', authMiddleware, async (req, res) => {
    try {
        const achievements = await Achievement.find({ userId: req.user._id }).sort({ date: -1 });
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

module.exports = router;
