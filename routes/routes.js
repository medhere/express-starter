const router = require('express').Router();
const { checkAuth, contactUs, contacts } = require('../controllers/authController');
const uploads = require('./uploadRoutes')
const admin = require('./adminRoutes')
const user = require('./userRoutes')
const auth = require('./authRoutes')

router.get('/contacts', contacts)
router.post('/contact-us',contactUs)
router.use('/uploads', checkAuth('admin','user'), uploads)
router.use('/admin', checkAuth('admin'), admin)
router.use('/user', checkAuth('user'), user)
router.use('/auth', auth);
router.route('*').all((req,res)=>res.sendStatus(404));

module.exports = router;