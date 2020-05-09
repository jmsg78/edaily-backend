const express = require("express");
const db = require("./app/models");
//const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//db.sequelize.sync();

//Drop tables

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Daily application." });
});

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = 8080;

require("./app/routes/project.routes")(app);
require("./app/routes/category.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});