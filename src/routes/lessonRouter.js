const { Router } = require("express");
const { LessonController } = require("../controllers/lessonController");

const adminMiddleware = require('../middlewares/adminMiddleware');

const router = Router()
const lessonController = new LessonController();

router.get("/", lessonController.get);
router.get("/:lessonId", lessonController.getOne);
router.post("/:lessonId", adminMiddleware(['admin']), lessonController.post);
router.put("/:lessonId", adminMiddleware(['admin']), lessonController.put);
router.delete("/:lessonId", adminMiddleware(['admin']), lessonController.delete);

module.exports = router;