const { validate } = require("node-cron")

module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        discountPercent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 100 }
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        usageLimit: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        usedCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    })
    return Coupon;

}