const router = require("express").Router();
const auth = require("../controller/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/datavalidation.middleware");

router.post("/register", validateRegister, auth.signUp);
router.post("/login", validateLogin, auth.signIn);

module.exports = router;
