const { Router } = require("express");
const { UserController } = require("../controllers/userController");

const router = Router()
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;