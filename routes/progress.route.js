const express = require('express');
const { markLessonComplete, getUserProgress } = require('../controllers/progress.controller');
const protect = require('../middleware/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: User progress management endpoints
 */

/**
 * @swagger
 * /api/progress/complete:
 *   post:
 *     summary: Mark a lesson as complete
 *     tags: [Progress]
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
 *         description: Lesson marked as complete
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.post('/complete', protect, markLessonComplete);

/**
 * @swagger
 * /api/progress/{courseId}:
 *   get:
 *     summary: Get user progress in a specific course
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to get user progress for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User progress in the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 completedLessons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       lessonId:
 *                         type: string
 *                       completionDate:
 *                         type: string
 *                         format: date-time
 *                 totalLessons:
 *                   type: integer
 *       401:
 *         description: Unauthorized access
 */
router.get('/:courseId', protect, getUserProgress);

module.exports = router;
