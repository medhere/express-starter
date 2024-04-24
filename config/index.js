const { dbSetup } = require('./database');
const { multer, multerErrorMessages } = require('./fileuploads');
const { sendmail, smtp } = require('./mailer');

exports.CONFIG = {
    JWT: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret_key',
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret_key',
        ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME || '1d',
        REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME || '7d',
    },
    DBSETUP: dbSetup,
    FILEUPLOAD: multer,
    FILEUPLOAD_ERR_MESSAGES: multerErrorMessages,
    SENDMAIL: sendmail,
    SMTP: smtp
};
