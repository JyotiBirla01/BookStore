const cron = require("node-cron");
const db = require("../models");
const { sendCartReminderEmail } = require("../utils/emailSender");
const { Op } = require("sequelize");

// Every 30 mins
cron.schedule("*/30 * * * *", async () => {
  const inactiveSince = new Date(Date.now() - 60 * 60 * 1000); // 1 hour

  // 1. Find carts not updated for 1 hour
  const carts = await db.Cart.findAll({
    where: {
      updatedAt: { [Op.lt]: inactiveSince },
    },
    include: [
      { model: db.Book },
      { model: db.User, attributes: ["id", "email"] },
    ],
  });

  // 2. Group by user
  const userCartMap = {};
  for (const cartItem of carts) {
    const email = cartItem.User?.email;
    if (!email) continue;

    if (!userCartMap[email]) userCartMap[email] = [];
    userCartMap[email].push(cartItem);
  }

  // 3. Send email to each user
  for (const [email, items] of Object.entries(userCartMap)) {
    try {
      await sendCartReminderEmail(email, items);
      console.log(` Cart reminder sent to ${email}`);
    } catch (err) {
      console.error(` Failed to send cart reminder to ${email}:`, err.message);
    }
  }
});
