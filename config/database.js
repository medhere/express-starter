// const mongoSanitize = require('express-mongo-sanitize');
// app.use(mongoSanitize());

exports.knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : ''
    }
});

require('knex-paginate').attachPaginate();



exports.dbSetup = {
    MONGODB : process.env,
    MYSQL: process.env
}