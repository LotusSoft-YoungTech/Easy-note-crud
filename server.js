const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

// create express app
const app = express();
const port = process.env.PORT || 3250;

if (process.env.NODE_ENV == "development") {
  // app.use(logger("dev"));
  console.log("Development mode on");
}

// parse request of content-type - appliction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const mongoose = require("mongoose");
// const dbConfig = require("./config/database.config.js");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("successfully connected to the database mongodb..");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now ...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// Require Note routes
require("./routes/note.routes.js")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
