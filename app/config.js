exports.mailer=require('nodemailer').createTransport({ 
  sendmail: true, 
  path: 'C:/laragon/bin/sendmail/sendmail.exe' 
});

exports.multer  = require('multer')({
    dest: process.cwd()+'/server/uploads/tmp',
    limits:{ fileSize: 5 * 1024 * 1024, files: 5, parts:5, },
    preservePath: true,
    // fileFilter: (req, file, callback) => {
    //   if (!(['.png', '.jpg'].includes(require('path').extname(file.originalname)))) { return callback(new Error('Only Images Allowed!')) }
    //   callback(null, true);
    // }
})


exports.conn = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'lydygold'
    }
});

// const mongoose= require('mongoose');

// mongoose.connect('mongodb://localhost:27017/userdb',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
// .then(() => console.log('connected'))
// .catch(err => console.log(err));



