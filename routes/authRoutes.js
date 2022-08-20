const router = require('express').Router();
const { userSignup, userSignin, userSignout, forgotPassword, resetPassword, confirmUser } = require('../controllers/authController');


router.post('/reset/:id', resetPassword)
router.post('/forgotpass', forgotPassword)
router.get('/signout', userSignout)
router.post('/signin', userSignin)
router.post('/signup', userSignup)
router.get('/confirm-user/:active/:email', confirmUser)

module.exports = router;  