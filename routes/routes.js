const router = require('express').Router();
const subdomain = require('express-subdomain');
const { doubleCsrf } = require("csrf-csrf");
const api = require('./api')
const web = require('./web');
const { HELPER } = require('../helpers');

const {
    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
    doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
    getSecret: process.env.CRYPTO_KEY
});


router.use('/', web)
router.use('/csrf', doubleCsrfProtection, web)
router.use('/api', api)
router.use(subdomain('admin', api));
// router.get('*',(req,res)=>{ res.sendFile(process.cwd()+'/public/index.html') })
router.route('*').all((req, res) => res.sendStatus(200));
router.use("/", (req, res, next) => {
    failure(res, HELPER.RESPONSE_MESSAGES.API_NOT_FOUND);
});


module.exports = router;