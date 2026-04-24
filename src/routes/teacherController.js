const { Router } = require("express");
const { TeacherController } = require("../controllers/teacherController");

const router = Router()
const teacherController = new TeacherController();

router.get("/", teacherController.get);
router.get("/:teacherId", teacherController.getOne);
router.post("/:teacherId", teacherController.post);
router.put("/:teacherId", teacherController.put);
router.delete("/:teacherId", teacherController.delete);

module.exports = router;