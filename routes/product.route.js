const router = require("express").Router();
const product = require("../controller/product.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/add-product", authMiddleware, product.addProducts);

module.exports = router;
