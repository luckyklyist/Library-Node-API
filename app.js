const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config()

const dbURL =process.env.DB_URL;
const port=process.env.PORT;
mongoose.connect(dbURL).then(() => console.log("Connected to the database online"))
  .catch((e) => console.log(e, "error connecting to the db"))

// routes
const libraryRoute=require('./routes/routes');
const authRoute=require('./routes/auth');

app.use(express.json());
app.use('/api/library', libraryRoute);
app.use('/api/user', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})