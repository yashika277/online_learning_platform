const Lesson = require('../models/lesson.model');
const LessonCompletion = require('../models/lessonCompletion.model');

// Admin: Add a lesson to a course
const addLesson = async (req, res) => {
    const { courseId, title, content } = req.body;
    try {
        const lesson = new Lesson({ course: courseId, title, content });
        await lesson.save();
        res.status(201).json({ message: 'Lesson created successfully', lesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all lessons for a specific course
const getLessons = async (req, res) => {
    const { courseId } = req.params;
    try {
        const lessons = await Lesson.find({ course: courseId });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark a lesson as completed
const markLessonComplete = async (req, res) => {
    const { lessonId } = req.body;
    const userId = req.user._id;

    try {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        const existingCompletion = await LessonCompletion.findOne({ user: userId, lesson: lessonId });
        if (existingCompletion) return res.status(400).json({ message: 'Lesson already completed' });

        const completion = new LessonCompletion({ user: userId, lesson: lessonId });
        await completion.save();

        res.status(201).json({ message: 'Lesson marked as completed', completion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get completed lessons for the logged-in user
const getCompletedLessons = async (req, res) => {
    const userId = req.user._id;
    try {
        const completedLessons = await LessonCompletion.find({ user: userId }).populate('lesson');
        res.json(completedLessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addLesson, getLessons, markLessonComplete, getCompletedLessons }