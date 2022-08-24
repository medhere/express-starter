const router = require('express').Router();
const { checkAuth } = require('../controllers/permissionController');
const newRoutes = require('./newRoutes')

router.use('/', checkAuth('admin','user'), newRoutes);
router.route('*').all((req,res)=>res.sendStatus(404));

module.exports = router;