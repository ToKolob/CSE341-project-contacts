const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.send('Hello World!');
// });

router.get('/', (req, res) => {
  res.send('Wellcome to CSE341-project-contacts, please use or /contacts!');
});

router.use('/users', require('./users'));
router.use('/contacts', require('./contacts.js'));

module.exports = router;