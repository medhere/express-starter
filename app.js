require('dotenv').config({ path: process.cwd()+'/.env' });
const express = require('express'), 
      app = express() 
      port = process.env.PORT || 2000;
require('express-async-errors');
const https = require('https'), http = require('http')
const logger = require('morgan');
const cookieparser = require('cookie-parser')
const session = require('express-session'), 
      FileStore = require('session-file-store')(session);
const helmet = require("helmet");
const compression=require('compression');
const cors=require('cors');
const fs=require('fs-jetpack');

const rateLimit = require('express-rate-limit').rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:'Too many requests from this IP, please try again after an hour',
})

// SETUP
app.settings.env === 'production' && app.disable('verbose errors')
app.set('view engine','ejs');
app.set('views', process.cwd()+'/views')
app.set('trust proxy',1);

app.use(logger('dev'));
app.use(rateLimit);
app.use(cors({ origin: '*', methods:'GET,POST,PATCH,DELETE,OPTIONS', credentials: false}))
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({limit:1024*1024*0.5, extended:true}));
app.use(express.json({limit:1024*1024*0.5}));
app.use('/', express.static(process.cwd()+'/public',{index:'index.html'})); // serves index.html for ./
app.use(cookieparser(process.env.CRYPTO_KEY));
app.use(session({
    store: new FileStore({secret:process.env.CRYPTO_KEY, path:process.cwd()+'/server/sessions'}),
    name:'sessid',
    secret:process.env.CRYPTO_KEY,
    resave:false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly:true, sameSite:true, signed:true }
}));


app.use('/api',require('./routes/routes'))
// app.get('*',(req,res)=>{ res.sendFile(process.cwd()+'/public/index.html') })

https.createServer({
  key: fs.read(process.cwd()+'/certs/key.pem'),
  cert: fs.read(process.cwd()+'/certs/cert.pem'),
  dhparam: fs.read(process.cwd()+'/certs/dh-strong.pem')
}, app).listen(port, () => {console.log(`HTTPS Server listening on port ${port}!`)});
// http.createServer(app).listen(port+1, () => {console.log(`HTTP Server listening on port ${port+1}!`)});;

