require('dotenv').config();
const express = require('express'), 
      app = express(), 
      port = 2000
const https = require('https'), http = require('http')
const fs = require('fs')
const cookieparser = require('cookie-parser')
const _ = require('lodash')
const session = require('express-session'), 
      FileStore = require('session-file-store')(session);
const helmet = require("helmet");
const compression=require('compression');
const cors=require('cors');
const validator = require('validator');
const xss = require('xss'); //sanitize inputs
const csurf = require('csurf') //in ejs
const jwt = require('jsonwebtoken')
const jp=require('fs-jetpack')
const nodemailer=require('nodemailer').createTransport({ sendmail: true, path: 'C:/laragon/bin/sendmail/sendmail.exe' });
const multer  = require('multer')({
  dest: './uploads',
  limits:{ fileSize: 1 * 1024 * 1024, files: 10, parts:10, },
  preservePath: true,
  fileFilter: (req, file, callback) => {
    if (!(['.png', '.jpg'].includes(require('path').extname(file.originalname)))) { return callback(new Error('Only Images Allowed!')) }
    callback(null, true);
  }
})

const rateLimit = require('express-rate-limit').rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:'Too many accounts created from this IP, please try again after an hour',
})

const createError = require('http-errors')
//  throw createError(status, message, {expose:true|false}); 

// SETUP
app.set('view engine','ejs');
app.set('trust proxy',1);

app.use(rateLimit);
app.use(cors({ origin: '*', methods:'GET,POST', credentials: false}))
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname+'/public')); 
// app.use(express.static(__dirname+'/public',{index:'index.html'})); // serves index.html for ./
// app.use('/static',express.static(__dirname+'/public',{index:'index.html'})); // static assests now use ./static/ and serves index.html

app.use(session({
    store: new FileStore({secret:process.env.SECRET_KEY,path:__dirname+'/sessions'}),
    name:'sessid',
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly:true, sameSite:true,signed:true }
}));

app.use(cookieparser(process.env.SECRET_KEY));
app.use(multer.any())

app.settings.env === 'production' && app.disable('verbose errors')

// routing
app.use('/', require('./routes/routes'));
app.route('*').get((req,res)=>res.send('404')).post((req,res)=>res.sendStatus(404));

http.createServer(app).listen(port+1, () => {console.log(`HTTP Server listening on port ${port+1}!`)});;

https.createServer({
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
  dhparam: fs.readFileSync("./certs/dh-strong.pem")
}, app).listen(port, () => {console.log(`HTTPS Server listening on port ${port}!`)});

