const { Router } = require("express");
const { DisciplineController } = require("../controllers/disciplineController");
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = Router()
const disciplineController = new DisciplineController();

router.get("/", disciplineController.get);
router.get("/:disciplineId", disciplineController.getOne);
router.post("/:disciplineId", adminMiddleware(['admin']),  disciplineController.post);
router.put("/:disciplineId", adminMiddleware(['admin']), disciplineController.put);
router.delete("/:disciplineId", adminMiddleware(['admin']), disciplineController.delete);

module.exports = router;