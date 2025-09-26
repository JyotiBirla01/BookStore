module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isNumeric: true,
                is: /^[6-9]\d{9}$/,
            }
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
            allowNull: false,
        }
    })
    return User;
}