const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalAmount: { type: Number },
  date: { type: Date, default: Date.now },
  pdfUrl: { type: String },
});

module.exports = mongoose.model("Quotation", quotationSchema);
