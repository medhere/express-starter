const router = require('express').Router();
const { multer } = require('../app/config');  
const { uploadFiles, deleteFile, getSingleFile, updateAvatar, getAvatar, getRequestAvatar } = require('../controllers/uploadsController');


router.post('/save/:user_type/:request_id', multer.fields([{name:'documents',maxCount:5},{name:'title',maxCount:1}]), uploadFiles)
router.delete('/delete/:id/:filename', deleteFile)
router.get('/get/:id/:filename', getSingleFile)
router.post('/update-avatar', updateAvatar)
router.get('/get-avatar/:id', getAvatar)
router.get('/get-request-avatar/:id', getRequestAvatar)

module.exports = router;
