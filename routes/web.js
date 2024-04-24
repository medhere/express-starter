const router = require('express').Router();
const { m } = require('../app/controllers/newController');
const { checkAuth } = require('../app/middleware/permissions');


router.get('/', m)

module.exports = router;  