const db = require("../models");
const { Op } = require("sequelize");
//stats means statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await db.User.count();

    const totalOrders = await db.Order.count();
    const totalRevenue = await db.Order.sum("amount", {
      where: { status: "placed" },
    });

    const ordersByStatus = await db.Order.findAll({
      attributes: ["status", [db.Sequelize.fn("COUNT", "status"), "count"]],
      group: ["status"],
    });

    res.json({
      users: totalUsers,
      orders: totalOrders,
      revenue: totalRevenue || 0,
      breakdown: ordersByStatus,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats", error: err.message });
  }
};


exports.getMonthlyRevenue = async (req, res) => {
  try {
    const data = await db.Order.findAll({
      where: { status: "placed" },
      attributes: [
        [db.Sequelize.fn("DATE_TRUNC", "month", db.Sequelize.col("createdAt")), "month"],
        [db.Sequelize.fn("SUM", db.Sequelize.col("amount")),"revenue"],
      ],
      group: [db.Sequelize.fn("DATE_TRUNC", "month", db.Sequelize.col("createdAt"))],
      order: [[db.Sequelize.fn("DATE_TRUNC", "month", db.Sequelize.col("createdAt")), "ASC"]],
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load revenue", error: err.message });
  }
};
