const express = require('express');
const router = express.Router();
// const addressController = require('../controllers/addressController');
const { requireAuth } = require('../middlewares/auth.middleware');
const { addAddress, getAddresses, deleteAddress } = require('../controllers/address.controller');

// Add a new address
router.post('/', requireAuth, addAddress);

// Get all addresses of logged-in user
router.get('/', requireAuth, getAddresses);

// Delete an address by ID
router.delete('/:id', requireAuth, deleteAddress);

module.exports = router;
