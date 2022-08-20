const router = require('express').Router();
const { getUserInfo, updateUserInfo, createRequest, getUserRequests, deleteUserRequest, getSingleUserRequest, userGetPayments, getSinglePayment, verifyPayment } = require('../controllers/userController');


router.get('/get-info', getUserInfo)
router.patch('/update-info', updateUserInfo)
router.post('/new-request', createRequest)
router.get('/view-requests', getUserRequests)
router.delete('/delete-request/:id', deleteUserRequest)
router.get('/request/:id', getSingleUserRequest)
router.get('/get-payments', userGetPayments)
router.get('/get-payment/:id', getSinglePayment)
router.post('/verify-payment', verifyPayment)


module.exports = router;  