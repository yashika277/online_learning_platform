const Course = require('../models/course.model');

// Create a new course
const createCourse = async (req, res) => {
    const { title, description, duration } = req.body;
    try {
        const course = new Course({ title, description, duration });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        course.title = title || course.title;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        await course.remove();
        res.json({ message: 'Course removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse }