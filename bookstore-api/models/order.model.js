module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        status: {
            type: DataTypes.ENUM("pending", "placed", "shipped", "delivered", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
            validate: {
                notEmpty: true,
            }
        },
        razorpayPaymentId: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    })

    return Order;
}
