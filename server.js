const { app, start } = require("./src/routes/routes");
require('dotenv').config()

const port = process.env.PORT || 3000;
const mongourl = process.env.MONGOURL ||  "mongodb://103.74.254.244:27017/oddsInstallmentDB"
start(mongourl);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
