const { Router } = require("express");
const { DisciplineController } = require("../controllers/disciplineController");

const router = Router()
const disciplineController = new DisciplineController();

router.get("/", disciplineController.get);
router.get("/:disciplineId", disciplineController.getOne);
router.post("/:disciplineId", disciplineController.post);
router.put("/:disciplineId", disciplineController.put);
router.delete("/:disciplineId", disciplineController.delete);

module.exports = router;