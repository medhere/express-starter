exports.multer = require('multer')({
    dest: process.cwd()+'/server/uploads/tmp',
    limits:{ fileSize: 1 * 1024 * 1024, files: 5, parts:20, },
    preservePath: true,
    // fileFilter: (req, file, callback) => {
    //   if (!(['.png', '.jpg'].includes(require('path').extname(file.originalname)))) { return callback(new Error('Only Images Allowed!')) }
    //   callback(null, true);
    // }
})


exports.multerErrorMessages = {
  LIMIT_PART_COUNT: 'Too many files and data sent',
  LIMIT_FILE_SIZE: 'Files too large',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
  LIMIT_UNEXPECTED_FILE: 'Too many images sent',
  MISSING_FIELD_NAME: 'Field name missing'
}


//usage inside controller
// const upload = multer.fields([
//   {name:'pictures',maxCount:1},
// ])

// upload(req, res, function (err) {
//   console.log(req.files, req.body)
//   if (err) {
//       res.status(400).send('Error: '+multerErrorMessages[err.code])
//   } else {


//   }
// })
