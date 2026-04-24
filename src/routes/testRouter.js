const { Router } = require("express");
const { TestAppController } = require("../controllers/testAppController");

const router = Router()
const testAppController = new TestAppController();

router.get("/", testAppController.get);

module.exports = router;