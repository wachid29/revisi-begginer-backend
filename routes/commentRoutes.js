const Router = require("express").Router();
const db = require("../db");

const controller = require("../controllers/commentController");

Router.get("/comment", controller.getComment);

Router.get("/comment/pages", controller.getCommentPage);

Router.get("/comment/find", controller.findComment);

Router.post("/comment/add", controller.addComment);

Router.patch("/comment/edit", controller.editComment);

Router.delete("/comment/delete", controller.deleteComment);

Router.get("/commentbyrecipe", controller.commentByRecipe);

module.exports = Router;
