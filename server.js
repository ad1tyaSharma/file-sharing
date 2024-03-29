//imports
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

// adding allowed clients api
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS,
// };

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors());
app.use(express.static("public"));

// connection to cloud storage
const connectDB = require("./config/db");
connectDB();
const fetchData = require("./script");
fetchData();
app.use(express.json());
// setting ejs as template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
const router = express.Router()
// Routes
app.get('/',(req,res)=>
{
  res.render('index.ejs')
})
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
