const crypto = require('crypto')

exports.UTILS ={
    BCRYPT: require('./bcrypt'),
    CRYPTO: require('./crypto'),
    HANDLERS: require('./handlers'),
    JWT: require('./jwt'),
    LOGGER: require('./logger'),
    ...require('./utils')
}
