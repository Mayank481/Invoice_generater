const Product = require("../models/product.model");
const Quotation = require("../models/quotation.model");
const { generatePDF } = require("../utils/pdfGenerator");
const logger = require("../logger/logger");

module.exports.addProducts = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;
    const savedProducts = await Product.insertMany(products);
    const totalAmount = savedProducts.reduce((acc, product) => {
      return acc + product.qty * product.rate;
    }, 0);

    const pdfUrl = await generatePDF(savedProducts, totalAmount);
    const quotation = await Quotation.create({
      userId,
      products: savedProducts.map((product) => product._id),
      totalAmount,
      pdfUrl: `${req.protocol}://${req.get("host")}${pdfUrl}`,
    });

    const grandTotal = quotation.totalAmount * 1.18;

    logger.info("Product Invoice Generated");
    res.status(200).json({
      message: "Invoice generated Successfully :)",
      quotation,
      grandTotal,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
