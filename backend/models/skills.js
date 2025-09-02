const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Frontend, Backend, Soft Skill
    proficiency: { type: String, required: true }, // e.g., Beginner, Intermediate, Advanced
    status: { type: String, required: true }, // e.g., Mastered, In Progress, Dropped
    acquiredDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // optional if multi-user
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);

