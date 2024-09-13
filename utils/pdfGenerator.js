const puppeteer = require("puppeteer");

module.exports.generatePDF = async (products, totalAmount) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          font-size: 12px;
        }
        .invoice-container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .invoice-table th, .invoice-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .invoice-table th {
          background-color: #f2f2f2;
        }
        .total-section {
          float: right;
          width: 300px;
          margin-bottom: 20px;
        }
        .total-section table {
          width: 100%;
          border-collapse: collapse;
        }
        .total-section td {
          padding: 8px;
        }
        .total-section .total-label {
          text-align: right;
        }
        .grand-total {
          font-weight: bold;
          color: #007bff;
        }
        .footer {
          text-align: left;
          margin-top: 95%;
          font-size: 10px;
        }
        .terms {
          font-size: 10px;
          margin-top: 50px;
          text-align: center;
          color: #808080;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <h1 class="invoice-header">Invoice</h1>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (product) => `
              <tr>
                <td>${product.name}</td>
                <td>${product.qty}</td>
                <td>${product.rate}</td>
                <td>INR ${(product.rate * product.qty).toLocaleString()}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="total-section">
          <table>
            <tr>
              <td class="total-label">Total:</td>
              <td>INR ${totalAmount.toLocaleString()}</td>
            </tr>
            <tr>
              <td class="total-label">GST:</td>
              <td>18%</td>
            </tr>
            <tr>
              <td class="total-label grand-total">Grand Total:</td>
              <td class="grand-total">INR ${(
                totalAmount * 1.18
              ).toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <div class="footer">
          Valid until: ${new Date().toLocaleDateString()}
        </div>

        <div class="terms">
          <p>Terms and Conditions:</p>
          <p>We are happy to supply any further information you may need and trust that you will call on us to fill your order.</p>
        </div>
      </div>
    </body>
  </html>
`;

  await page.setContent(htmlContent);
  const pdfPath = `./invoices/invoice-${Date.now()}.pdf`;
  const returnPdfPath = `/invoices/invoice-${Date.now()}.pdf`;
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return returnPdfPath;
};
