const app = require('./app')
const mongoose = require('mongoose');

const {DB_HOST, PORT = 6000} = process.env;

const settingsMongoose = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
}


mongoose.connect(DB_HOST, settingsMongoose)
  .then(()=> {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })



// app.listen(PORT, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
