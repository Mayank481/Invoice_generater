const router = require("express").Router();
const quotation = require("../controller/quotation.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/quotations", authMiddleware, quotation.viewQuotations);

module.exports = router;
