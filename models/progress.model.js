const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Progress', ProgressSchema);
