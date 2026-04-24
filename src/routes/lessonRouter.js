const { Router } = require("express");
const { LessonController } = require("../controllers/lessonController");

const router = Router()
const lessonController = new LessonController();

router.get("/", lessonController.get);
router.get("/:lessonId", lessonController.getOne);
router.post("/:lessonId", lessonController.post);
router.put("/:lessonId", lessonController.put);
router.delete("/:lessonId", lessonController.delete);

module.exports = router;