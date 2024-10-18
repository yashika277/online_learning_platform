require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
const dbConnect = require("./db/dbConnect");

const authRoutes = require('./routes/auth.route');
const courseRoutes = require('./routes/course.route');
const enrollmentRoutes = require('./routes/enrollment.route');
const lessonRoutes = require('./routes/lesson.route');
const progressRoutes = require('./routes/progress.route');

//body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//cookie
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

//database connect
dbConnect();

app.get("/", (req, res) => {
    res.send(
        "<center><h1>Online Learning Platform</h1><br>Get online learning platform  Api <a href=https://github.com/yashika277/online_learning_platform.git target=_blank>Repository :Online Learning Platform</a></center>"
    );
});

// swagger Ui
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Online_Learning_Platform  API',
        version: '1.0.0',
        description: 'API for managing Online_Learning_Platform',
    },
    servers: [
        {
            url: 'http://localhost:5000/api', // Replace with your API base URL
        },
    ],
};

// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/auth.route.js', './routes/course.route.js', './routes/enrollment.route.js', './routes/lesson.route.js', './routes/progress.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//server
app.listen(process.env.PORT, () => {
    console.log(`server listening on port : ${process.env.PORT}`);

})