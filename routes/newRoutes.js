const router = require('express').Router();
const { m } = require('../controllers/newController');

router.get('/', m)

module.exports = router;  