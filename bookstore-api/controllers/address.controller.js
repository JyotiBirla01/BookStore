const db = require("../models");

exports.addAddress = async (req, res) => {
  const { fullName, phone, pincode, state, city, landmark, addressLine, isDefault } = req.body;

  const address = await db.Address.create({
    userId: req.user.id,
    fullName,
    phone,
    pincode,
    state,
    city,
    landmark,
    addressLine,
    isDefault: !!isDefault,
  });

  res.status(201).json({ message: "Address added", address });
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await db.Address.findAll({
      where: {
        userId: req.user.id,
        isTemporary: false, // ❌ Exclude temporary "current location" addresses
      },
      order: [['isDefault', 'DESC'], ['createdAt', 'DESC']],
    });

    res.json(addresses);
  } catch (err) {
    console.error("Get addresses error:", err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};


exports.deleteAddress = async (req, res) => {
  const { id } = req.params;

  const address = await db.Address.findOne({
    where: { id, userId: req.user.id },
  });

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  await address.destroy();
  res.json({ message: "Address deleted" });
};
