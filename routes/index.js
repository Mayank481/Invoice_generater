const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/product", require("./product.route"));
router.use("/quotation", require("./quotation.route"));

module.exports = router;
