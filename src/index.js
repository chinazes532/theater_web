const http = require('http');
const { initDB } = require('./database/dbServer');
const cors = require('cors');
const express = require("express");

const testAppRoutes = require("./routes/testRouter");
const studentRoutes = require("./routes/studentRouter");
const teacherRoutes = require("./routes/teacherController");
const disciplineRoutes = require("./routes/disciplineRouter");
const lessonRoutes = require("./routes/lessonRouter");
const canceledRoutes = require("./routes/canceledRouter");

require("dotenv").config();

const port = process.env.SERVPORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/test", testAppRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/lessons", lessonRoutes);
app.use("/discipline", disciplineRoutes);
app.use("/canceled", canceledRoutes);

(async () => {
    await initDB();

    http.createServer(app)
        .listen(
            port,
            () => console.info(`Server running on port ${port}`)
        );
})();