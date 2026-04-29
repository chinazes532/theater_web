const http = require('http');
const { initDB } = require('./database/dbServer');
const cors = require('cors');
const express = require("express");

const testAppRoutes = require("./routes/testRouter");
const studentRoutes = require("./routes/studentRouter");
const teacherRoutes = require("./routes/teacherRouter");
const disciplineRoutes = require("./routes/disciplineRouter");
const lessonRoutes = require("./routes/lessonRouter");
const canceledRoutes = require("./routes/canceledRouter");
const userRoutes = require("./routes/userRouter");

const authMiddleware = require('../src/middlewares/authMiddleware');

require("dotenv").config();

const port = process.env.SERVPORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/test", authMiddleware(), testAppRoutes);
app.use("/students", authMiddleware(), studentRoutes);
app.use("/teachers", authMiddleware(), teacherRoutes);
app.use("/lessons", authMiddleware(), lessonRoutes);
app.use("/discipline", authMiddleware(), disciplineRoutes);
app.use("/canceled", authMiddleware(), canceledRoutes);
app.use("/users", userRoutes);

(async () => {
    await initDB();

    http.createServer(app)
        .listen(
            port,
            () => console.info(`Server running on port ${port}`)
        );
})();