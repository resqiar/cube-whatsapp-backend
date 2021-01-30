

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true}).catch((e) => {
    console.log(e)
})