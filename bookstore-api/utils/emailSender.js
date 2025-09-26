exports.sendOrderStatusEmail = async (to, orderId, status, remark) => {
  const subject = `Order #${orderId} Status Updated: ${status.toUpperCase()}`;
  const html = `
    <h3>Your order has been updated</h3>
    <p>Status: <strong>${status}</strong></p>
    ${remark ? `<p>Note: ${remark}</p>` : ""}
    <p>Thank you for shopping with us!</p>
  `;

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
};

exports.sendCartReminderEmail = async (to, cartItems) => {
  const itemsHtml = cartItems.map(item =>
    `<li>${item.Book.title} - ₹${item.Book.price} × ${item.quantity}</li>`
  ).join("");

  const html = `
    <h3>You left some books in your cart!</h3>
    <ul>${itemsHtml}</ul>
    <p>Checkout now before they’re gone!</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "⏰ Don't forget your cart!",
    html,
  });
};
