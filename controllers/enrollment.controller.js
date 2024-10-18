const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

// Enroll user in a course
const enrollCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id;

    try {
        const enrollment = new Enrollment({ user: userId, course: courseId });
        await enrollment.save();
        res.status(201).json({ message: 'User enrolled successfully' });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

// Get all enrollments for the logged-in user
const getUserEnrollments = async (req, res) => {
    const userId = req.user._id;

    try {
        const enrollments = await Enrollment.find({ user: userId }).populate('course');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all enrollments (for all users)
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('user course');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { enrollCourse, getUserEnrollments, getAllEnrollments }