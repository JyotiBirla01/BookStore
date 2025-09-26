// models/address.js
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    pincode: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    landmark: DataTypes.STRING,
    addressLine: DataTypes.TEXT,
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isTemporary: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}

  });

  Address.associate = (models) => {
    Address.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Address;
};
