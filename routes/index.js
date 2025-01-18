const router = require('express').Router();
const sweggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');



router.use('/api-docs', sweggerUi.serve, sweggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
  //#swagger.tags = ['Welcome']
  res.send('Wellcome to CSE341-project-contacts, please use or /contacts!');
});

router.use('/contacts', require('./contacts.js'));

module.exports = router;