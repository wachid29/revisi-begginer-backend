const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

const userDataRoutes = require("./routes/userDataRoutes");
const commentRoutes = require("./routes/commentRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

app.use(helmet());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static("images"));

app.use(xss());
// Define all routes userdata
app.use("/", userDataRoutes);
app.use("/", commentRoutes);
app.use("/", recipeRoutes);
app.listen(port, () => {
  console.log(`Fighting!!`);
});
