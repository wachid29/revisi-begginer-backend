const Router = require("express").Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/recipeController");
// image storage
const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
// upload email
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

Router.get("/recipe", controller.getRecipe);

Router.get("/recipe/pages", controller.getRecipePage);

Router.get("/recipe/get5data", controller.getNewestRecipe);

Router.get("/recipe/find", controller.findRecipe);

Router.post("/recipe/add", upload.single("image"), controller.addNewRecipe);

Router.patch("/recipe/edit", controller.editRecipe);

Router.delete("/recipe/delete/:id", controller.deleteRecipe);

Router.get("/commentbyrecipe", controller.commentByRecipe);

module.exports = Router;
