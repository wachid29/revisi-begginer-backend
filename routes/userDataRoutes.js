const Router = require("express").Router();
const db = require("../db");
const controller = require("../controllers/userDataController");

// GET USER PAGE
Router.get("/userdata/pages", controller.getUsersPage);
// GET USER
Router.get("/userdata", controller.getUsers);
// FIND USER BY NAME
Router.get("/userdata/find", controller.findNameUsers);
// ADD USER
Router.post("/userdata/add", controller.addUsers);
// EDIT USER
Router.patch("/userdata/edit", controller.editUsers);
// DELETE USER
Router.delete("/userdata/delete/:id", controller.deleteUsers);

Router.get("/recipebyuser", controller.recipeByUser);

module.exports = Router;
