var express = require('express');

const { newUser, findUser } = require('../controllers/newController');

const router = express.Router();
router.get('/new', newUser);
router.get('/find', findUser);
module.exports = router;

// exports.list = function(req, res){
//     res.send('users');
// };
  