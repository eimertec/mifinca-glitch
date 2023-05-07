var mongoosedb = require('mongoose');

// mongoosedb.connect('mongodb://localhost:27017/rpidb',{ useNewUrlParser: true })
// .then(result=>{
//     console.log("Connected to MongoDB OK")
// })
// .catch(er=>{
//     console.error("MongoDB Connection : "+ er)
// })

module.exports = mongoosedb;