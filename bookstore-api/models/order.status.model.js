module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define("OrderStatus", {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return OrderStatus;
};
