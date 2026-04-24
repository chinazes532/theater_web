const { Router } = require("express");
const { CanceledController } = require("../controllers/canceledController");

const router = Router()
const canceledController = new CanceledController();

router.get("/", canceledController.get);
router.get("/:canceledId", canceledController.getOne);
router.post("/:canceledId", canceledController.post);
router.put("/:canceledId", canceledController.put);
router.delete("/:canceledId", canceledController.delete);

module.exports = router;