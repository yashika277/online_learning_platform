const Progress = require('../models/progress.model');
const Lesson = require('../models/lesson.model');

// Mark a lesson as completed
const markLessonComplete = async (req, res) => {
    const { lessonId } = req.body;
    const userId = req.user._id;

    try {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        const existingProgress = await Progress.findOne({ user: userId, lesson: lessonId });
        if (existingProgress) return res.status(400).json({ message: 'Lesson already completed' });

        const progress = new Progress({ user: userId, course: lesson.course, lesson: lessonId });
        await progress.save();

        res.status(201).json({ message: 'Lesson marked as completed', progress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user progress in a course
const getUserProgress = async (req, res) => {
    const userId = req.user._id;
    const { courseId } = req.params;

    try {
        const progress = await Progress.find({ user: userId, course: courseId }).populate('lesson');
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { markLessonComplete, getUserProgress }