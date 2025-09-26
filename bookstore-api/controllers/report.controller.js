const db = require("../models");
const { Parser } = require("json2csv");

exports.downloadSalesReport = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      include: [
        { model: db.User, attributes: ["email", "mobile"] },
        { model: db.Coupon, attributes: ["code", "discountPercent"] },
      ],
    });

    const data = orders.map((order) => ({
      orderId: order.id,
      userEmail: order.User.email,
      userMobile: order.User.mobile,
      amount: order.totalAmount,
      coupon: order.Coupon?.code || "N/A",
      discount: order.Coupon?.discountPercent || 0,
      status: order.status,
      createdAt: order.createdAt,
    }));

    const fields = [
      "orderId",
      "userEmail",
      "userMobile",
      "amount",
      "coupon",
      "discount",
      "status",
      "createdAt",
    ];
    
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("sales-report.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export report", error: err.message });
  }
};
