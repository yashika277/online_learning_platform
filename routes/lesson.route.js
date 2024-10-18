const express = require('express');
const {
  addLesson,
  getLessons,
  markLessonComplete,
  getCompletedLessons
} = require('../controllers/lesson.controller');
const protect = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management endpoints
 */

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Add a lesson to a course (admin only)
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lesson added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 */
router.post('/', protect, admin, addLesson);

/**
 * @swagger
 * /api/lessons/{courseId}:
 *   get:
 *     summary: Get all lessons for a specific course
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to get lessons for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of lessons for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
router.get('/:courseId', protect, getLessons);

/**
 * @swagger
 * /api/lessons/complete:
 *   post:
 *     summary: Mark a lesson as completed for the logged-in user
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lesson marked as completed
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.post('/complete', protect, markLessonComplete);

/**
 * @swagger
 * /api/lessons/completed:
 *   get:
 *     summary: Get all completed lessons for the logged-in user
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: A list of completed lessons for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   lessonId:
 *                     type: string
 *                   completionDate:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized access
 */
router.get('/completed', protect, getCompletedLessons);

module.exports = router;
