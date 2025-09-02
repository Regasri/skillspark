const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Skill = require('../models/skills'); // Make sure this model is defined

// Add a new skill
router.post('/skills', authMiddleware, async (req, res) => {
    try {
        const {
            skillName,
            category,
            proficiency,
            status,
            acquiredDate
        } = req.body;

        const newSkill = new Skill({
            skillName,
            category,
            proficiency,
            status,
            acquiredDate,
            userId: req.user._id // assuming authMiddleware sets req.user
        });

        await newSkill.save();
        res.status(201).json({ message: 'Skill added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// Get all skills for the logged-in user
router.get('/skills', authMiddleware, async (req, res) => {
    try {
        const skills = await Skill.find({ userId: req.user._id });
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// Get skill statistics
router.get('/skills-stats', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;

        const totalSkills = await Skill.countDocuments({ userId });
        const masteredSkills = await Skill.countDocuments({ userId, status: 'Mastered' });
        const inProgressSkills = await Skill.countDocuments({ userId, status: 'In Progress' });
        const droppedSkills = await Skill.countDocuments({ userId, status: 'Dropped' });

        const skillsStats = {
            totalSkills,
            masteredSkills,
            inProgressSkills,
            droppedSkills,
        };

        res.status(200).json(skillsStats);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

module.exports = router;
