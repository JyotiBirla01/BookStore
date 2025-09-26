module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {}, { timestamps: false });

  return Wishlist;
};
