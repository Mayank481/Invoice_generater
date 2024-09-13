const Quotation = require("../models/quotation.model");
const logger = require("../logger/logger");

module.exports.viewQuotations = async (req, res) => {
  try {
    const userId = req.user.id;
    const quotations = await Quotation.find({ userId }).populate("products");
    logger.info("Quotation fetching Successfully :)");
    res.status(200).json({
      message: "Quotation Fetch Successfully :)",
      quotations,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
