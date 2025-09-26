const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: dbConfig.pool,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// We'll import models later here
db.User = require("./user.model")(sequelize, DataTypes);
db.Category=require("./category.model")(sequelize,DataTypes)
db.Book=require("./book.model")(sequelize,DataTypes)
db.Cart=require("./cart.model")(sequelize,DataTypes)
db.Order=require("./order.model")(sequelize,DataTypes)
db.UserProfile = require("./userProfile.model")(sequelize, DataTypes);
db.AdminProfile = require("./adminProfile.model")(sequelize, DataTypes);
db.Wishlist = require("./wishlist.model")(sequelize, DataTypes);
db.Review = require("./review.model")(sequelize, DataTypes);
db.OrderStatus = require("./order.status.model")(sequelize, DataTypes);
db.Coupon=require("./coupon.model")(sequelize,DataTypes);
db.Review =require("./review.model")(sequelize,DataTypes);
db.Address =require("./address.model")(sequelize,DataTypes);

//Assciations
db.Category.hasMany(db.Book, { foreignKey: "categoryId" });
db.Book.belongsTo(db.Category, { foreignKey: "categoryId" });

// User to Cart
db.User.hasMany(db.Cart, { foreignKey: "userId" });
db.Cart.belongsTo(db.User, { foreignKey: "userId" });

// Book to Cart
db.Book.hasMany(db.Cart, { foreignKey: "bookId" });
db.Cart.belongsTo(db.Book, { foreignKey: "bookId" });
module.exports = db;

// User to Order
db.User.hasMany(db.Order, { foreignKey: "userId" });
db.Order.belongsTo(db.User, { foreignKey: "userId" });

// Order to Book (many-to-many through OrderItems)
db.OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});


// Order belongs to an Address
db.Address.hasMany(db.Order, { foreignKey: "addressId" });
db.Order.belongsTo(db.Address, { foreignKey: "addressId", as: "address" });

db.Order.belongsToMany(db.Book, {
  through: db.OrderItem,
  foreignKey: "orderId",
  otherKey: "bookId",
  as: "items", 
});
db.Book.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "bookId",
 otherKey: "orderId",
 
});

// Wishlist: User ↔ Book (many-to-many)
db.User.belongsToMany(db.Book, {
  through: db.Wishlist,
  as: "WishlistedBooks",
  foreignKey: "userId",
});

db.Book.belongsToMany(db.User, {
  through: db.Wishlist,
  as: "UsersWhoWishlisted",
  foreignKey: "bookId",
});

db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Book.hasMany(db.Review, { foreignKey: "bookId" });

db.Review.belongsTo(db.User, { foreignKey: "userId" });
db.Review.belongsTo(db.Book, { foreignKey: "bookId" });

db.Order.hasMany(db.OrderStatus, { foreignKey: "orderId", as: "timeline" });
db.OrderStatus.belongsTo(db.Order, { foreignKey: "orderId" });


db.User.hasMany(db.Cart, { foreignKey: "userId" });
db.Cart.belongsTo(db.User, { foreignKey: "userId" });

db.Book.hasMany(db.Cart, { foreignKey: "bookId" });
db.Cart.belongsTo(db.Book, { foreignKey: "bookId" });

// Optional: associate to Order
db.Coupon.hasMany(db.Order);
db.Order.belongsTo(db.Coupon);

db.Book.hasMany(db.Review, { foreignKey: 'bookId' });


db.Review.belongsTo(db.Book, { foreignKey: 'bookId' });
db.Address.belongsTo(db.User, { foreignKey: "userId" });

