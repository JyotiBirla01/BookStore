const twilio = require("twilio");

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOrderStatusSms = async (toPhone, orderId, status) => {
  const message = `Order #${orderId} updated. New status: ${status}`;
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: toPhone,
  });
};
