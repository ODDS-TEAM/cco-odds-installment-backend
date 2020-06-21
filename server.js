const { app } = require("./src/app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongourl = process.env.MONGOURL || "mongodb://mongo:27017/installment"

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

let db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', mongourl)
})

db.on('error', err => {
    console.error('connection error:', err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
