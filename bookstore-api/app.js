const express = require('express');
const db = require("./models");
const path=require("path")
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");
require("dotenv").config();
require("./jobs/cartReminder");

const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes=require("./routes/category.routes")
const bookRoutes=require("./routes/book.routes")
const cartRoutes=require("./routes/cart.routes")
const orderRoutes=require("./routes/orders.routes")
const adminRoutes = require("./routes/admin.routes");
const profileRoutes = require("./routes/profile.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const reviewRoutes = require("./routes/review.routes");
const paymentRoutes = require("./routes/payment.routes");
const invoiceRoutes = require("./routes/invoice.routes");
const couponRoutes=require("./routes/coupon.routes")
const reportRoutes=require("./routes/report.routes")
const addresRoutes=require("./routes/address.route")
const fs = require("fs");
const morgan = require('morgan');



const app=express();
app.use(cors()); 
app.use(express.json())
app.use(morgan('dev'));
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ Created uploads/ directory");
}

app.use("/uploads", express.static("uploads"));

const apiPrefix = "/api/v1";


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/profile`, profileRoutes);
app.use(`${apiPrefix}/admin`, adminRoutes);
app.use(`${apiPrefix}/user`, userRoutes);
app.use(`${apiPrefix}/category`, categoryRoutes);
app.use(`${apiPrefix}/book`,bookRoutes);
app.use(`${apiPrefix}/cart`,cartRoutes);
app.use(`${apiPrefix}/order`, orderRoutes);
app.use(`${apiPrefix}/wishlist`, wishlistRoutes);
app.use(`${apiPrefix}/review`,reviewRoutes);
app.use(`${apiPrefix}/payment`, paymentRoutes);
app.use(`${apiPrefix}/invoice`, invoiceRoutes);
app.use(`${apiPrefix}/coupon`, couponRoutes);
app.use(`${apiPrefix}/report`, reportRoutes);
app.use(`${apiPrefix}/addresses`, addresRoutes);
// db.sequelize.sync({ force: true }) // drops and recreates all tables
db.sequelize.sync({ alter: true })

// db.sequelize.sync()
.then(()=>{
    console.log("Database synced successfully.");
    console.log(`check swagger at http://localhost:${process.env.PORT}/api-docs`);
})
.catch((err)=>{
    console.error("Failed to sync database:", err);
})


module.exports=app;

