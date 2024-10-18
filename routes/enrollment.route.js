const express = require('express');
const {
  enrollCourse,
  getUserEnrollments,
  getAllEnrollments
} = require('../controllers/enrollment.controller');
const protect = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment management endpoints
 */

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll a user in a course
 *     tags: [Enrollments]
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
 *     responses:
 *       201:
 *         description: Enrollment successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.post('/', protect, enrollCourse);

/**
 * @swagger
 * /api/enrollments/my-enrollments:
 *   get:
 *     summary: Get logged-in user's enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: A list of the user's enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   courseId:
 *                     type: string
 *                   enrollmentDate:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized access
 */
router.get('/my-enrollments', protect, getUserEnrollments);

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments (admin only)
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: A list of all enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   courseId:
 *                     type: string
 *                   enrollmentDate:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 */
router.get('/', protect, admin, getAllEnrollments);

module.exports = router;
