const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateInvoice = async (order, user, items) => {
  const filePath = path.join(__dirname, `../invoices/invoice-${order.id}.pdf`);
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("INVOICE", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Order ID: ${order.id}`);
  doc.text(`Customer: ${user.email}`);
  doc.text(`Status: ${order.status}`);
  doc.text(`Date: ${order.createdAt.toDateString()}`);
  doc.moveDown();

  doc.fontSize(14).text("Items:", { underline: true });
  items.forEach((item, i) => {
    doc
      .fontSize(12)
      .text(
        `${i + 1}. ${item.Book.title} - ₹${item.Book.price} × ${item.quantity} = ₹${item.Book.price * item.quantity}`
      );
  });

  const total = items.reduce((sum, item) => sum + item.Book.price * item.quantity, 0);
  doc.moveDown();
  doc.fontSize(14).text(`Total: ₹${total}`, { align: "right" });

  doc.end();

  return filePath;
};
