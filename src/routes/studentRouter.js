const { Router } = require("express");
const { StudentController } = require("../controllers/studentController");

const router = Router()
const studentController = new StudentController();

router.get("/", studentController.get);
router.get("/:studentId", studentController.getOne);
router.post("/", studentController.post);
router.put("/:studentId", studentController.put);
router.delete("/:studentId", studentController.delete);

module.exports = router;