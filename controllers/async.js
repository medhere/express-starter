const createError = require('http-errors')

// app.post('/', async(error, req, res) => {
//     try {  /* ... */  }
//     catch (error) { 
//         error.status,
//         error.message,
//         error.stack    
//         // throw createError(status, message, properties); 
//     }
// })

//async
// const wrap = fn => (...args) => fn(...args).catch(args[2])
// app.get('/async', wrap(async (req, res, next) => {
//   const company = await getCompanyById(req.query.id)
//   const stream = getLogoStreamById(company.id)
//   stream.on('error', next).pipe(res)
// }))
