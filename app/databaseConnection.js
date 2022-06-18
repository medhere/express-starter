// const mongoose= require('mongoose');


exports.conn = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'manager'
    }
});

// mongoose.connect('mongodb://localhost:27017/userdb',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
// .then(() => console.log('connected'))
// .catch(err => console.log(err));

