const router = require('express').Router();
const { dashboardData, getAdminInfo, updateAdminInfo, getUsers, updateUser, resetUserPassword, deleteUser, getRequests, updateRequest, deleteRequest, getUserRequest, updateRequestStatus, addComment, setCommentStatus, deleteStatus, addPayment, getSinglePayment, updatePayment, deletePayment, getPayments, setUserActivation } = require('../controllers/adminController');


router.get('/dashboard', dashboardData)
router.get('/get-info', getAdminInfo)
router.patch('/update-info', updateAdminInfo)
router.get('/get-users', getUsers)
router.patch('/update-user/:id', updateUser)
router.patch('/set-active/:id', setUserActivation)
router.patch('/reset-user-password/:id', resetUserPassword)
router.delete('/delete-user/:id', deleteUser)
router.get('/get-requests', getRequests)
router.patch('/update-request/:id', updateRequest)
router.delete('/delete-request/:id', deleteRequest)
router.get('/request/:id', getUserRequest)
router.patch('/update-request-status/:id', updateRequestStatus)
router.post('/add-comment', addComment)
router.patch('/update-comment-status/:id', setCommentStatus)
router.delete('/delete-comment/:id', deleteStatus)
router.get('/get-payments', getPayments)
router.post('/add-payment', addPayment)
router.get('/get-payment/:id', getSinglePayment)
router.patch('/update-payment/:id', updatePayment)
router.delete('/delete-payment/:id', deletePayment)

module.exports = router;  