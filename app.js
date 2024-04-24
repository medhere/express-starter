require('dotenv').config({ path: process.cwd() + '/.env' });
const express = require('express'),
  app = express(), port = process.env.PORT || 8777;
require('express-async-errors');
const https = require('https'), http = require('http')
const morgan = require('morgan');
const cookieparser = require('cookie-parser')
const session = require('express-session'),
  FileStore = require('session-file-store')(session);
const cookieSession = require('cookie-session')
const helmet = require("helmet");
const compression = require('compression');
const cors = require('cors');
const fs = require('fs-jetpack');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const sanitizer = require("perfect-express-sanitizer");

const socketIo = require('./app/websockets/socketio_init');
const { HELPER } = require('./helpers');
const { failure } = require('./utils/handlers');
// const logger = require('./utils/logger');


// SETUP
app.settings.env === 'production' && app.disable('verbose errors')
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views')
app.set('trust proxy', 1);

//logging
// app.use(morgan('dev'));
app.use(morgan('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));

//http connection control
app.use(rateLimit.rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after an hour',
}));
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: false,
  optionsSuccessStatus: 204
}))
app.use(helmet());
app.use(sanitizer.clean({ xss: true, noSql: true, sql: true, level: 5, }));
app.use(hpp());
app.use(compression());
app.use(express.urlencoded({ limit: 1024 * 1024 * 0.5, extended: true }));
app.use(express.json({
  extended: false,
  parameterLimit: 50000,
  limit: 1024 * 1024 * 0.5
}));

//cookies and sessions
// app.use(cookieSession({
//   name: 'session',
//   secret:process.env.CRYPTO_KEY,
//   domain: "",
//   sameSite: 'strict',
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
app.use(session({
  store: new FileStore({ secret: process.env.CRYPTO_KEY, path: process.cwd() + '/server/sessions' }),
  name: 'sessid',
  secret: process.env.CRYPTO_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, sameSite: true, signed: true, maxAge: 60 * 60 * 60 * 24 }
}));
app.use(cookieparser(process.env.CRYPTO_KEY));

//Routing
// app.use('/', express.static(process.cwd() + '/public', { index: 'index.html' })); // serves index.html for ./
// app.use('/app', express.static(process.cwd() + '/build', { index: 'index.html' }));
app.use('/static-uploads', express.static(process.cwd() + '/server/uploads'));
app.use(require('./routes/routes'))


//error handling

/* to handle the error*/
app.use((err, req, res, next) => {
  if (!err) return next;
  failure(res, new Error(err));
});
app.use(HELPER.ERROR_HANDLER);
app.use(HELPER.ROUTE_HANDLER);
process.on("unhandledRejection", (err) => {
  console.log(err);
  // process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log(err);
  // process.exit(1);
});


//init server
server = https.createServer({
  key: fs.read(process.cwd() + '/certs/key.pem'),
  cert: fs.read(process.cwd() + '/certs/cert.pem'),
  dhparam: fs.read(process.cwd() + '/certs/dh-strong.pem')
}, app);

//socket io init
socketIo(server);

//start express
server.listen(port, () => { console.log(`HTTPS Server listening on port ${port}!`) });
server.on('error', function (error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }

});

// http.createServer(app).listen(port+1, () => {console.log(`HTTP Server listening on port ${port+1}!`)});;

