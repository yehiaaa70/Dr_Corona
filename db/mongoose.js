const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Dr_Corona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(()=>console.log("Connected !"))
  .catch((e)=>console.error("Failed ! "+e));
  


