const { app, start } = require("./src/routes/routes");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongourl = process.env.MONGOURL || "mongodb://localhost:27017/installment"

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


start();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
