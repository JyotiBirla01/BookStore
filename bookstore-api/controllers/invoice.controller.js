const db = require("../models");
const { generateInvoice } = require("../utils/invoiceGenerator");

exports.downloadInvoice = async (req, res) => {
  const { orderId } = req.params;

  const order = await db.Order.findByPk(orderId, {
    include: { model: db.User },
  });

  if (!order || order.status !== "placed") {
    return res.status(400).json({ message: "Invalid or unpaid order" });
  }

  const items = await db.Cart.findAll({
    where: { userId: order.userId },
    include: db.Book,
  });

  const filePath = await generateInvoice(order, order.User, items);

  res.download(filePath, `invoice-${orderId}.pdf`);
};
