const express = require('express');
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require('../controllers/course.controller');
const protect = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management endpoints
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     responses:
 *       200:
 *         description: A list of courses
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
 *                   description:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
router.route('/').get(protect, getCourses);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 */
router.route('/').post(protect, admin, createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 */
router.route('/:id').put(protect, admin, updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []  # Indicating that this endpoint requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Admin access required
 */
router.route('/:id').delete(protect, admin, deleteCourse);

module.exports = router;
