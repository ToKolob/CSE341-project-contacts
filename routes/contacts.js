const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts.js');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);

module.exports = router;
