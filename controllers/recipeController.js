const db = require("../db");
const model = require("../model/recipeModel");

const getRecipe = async (req, res) => {
  try {
    const getDataRecipe = await model.getAllRecipe();
    res.status(200).json({
      recipe: getDataRecipe?.rows,
      jumlahData: getDataRecipe?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("ada yang error");
  }
};

const getRecipePage = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const getDataRecipe = await model.getRecipePages(limit, page);
    if (getDataRecipe?.rowCount) {
      res.status(200).json({
        recipe: getDataRecipe?.rows,
        jumlahData: getDataRecipe?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const getNewestRecipe = async (req, res) => {
  try {
    const getDataRecipe = await model.get5Recipe();
    res.status(200).json({
      recipe: getDataRecipe?.rows,
      jumlahData: getDataRecipe?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("ada yang error");
  }
};

const findRecipe = async (req, res) => {
  //cari berdasarkan title
  try {
    const { title_recipe } = req.query;
    const getDataRecipe = await model.findRecipeByTitle(title_recipe);
    if (getDataRecipe?.rowCount) {
      res.status(200).json({
        recipe: getDataRecipe?.rows,
        jumlahData: getDataRecipe?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const addNewRecipe = async (req, res) => {
  try {
    const image = `http://localhost:8001/images/${req.file.filename}`;
    const { title_recipe, ingredients, vidio_step, user_id } = req.body;
    const postRecipe = await model.addedRecipe(
      title_recipe,
      image,
      ingredients,
      vidio_step,
      user_id
    );
    res.status(200).send("data berhasil di tambah");
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editRecipe = async (req, res) => {
  try {
    const { id, title_recipe, image, ingredients, vidio_step, user_id } =
      req.body;
    const getDataRecipe = await model.findRecipeByID(id);
    if (getDataRecipe?.rowCount) {
      let inputTitle_recipe =
        title_recipe || getDataRecipe?.rows[0].title_recipe;
      let inputImage = image || getDataRecipe?.rows[0].image;
      let inputIngredients = ingredients || getDataRecipe?.rows[0].ingredients;
      let inputVidio_step = vidio_step || getDataRecipe?.rows[0].vidio_step;
      let inputuser_id = user_id || getDataRecipe?.rows[0].user_id;
      let massage = "";
      if (title_recipe) massage += "title_recipe, ";
      if (image) massage += "image, ";
      if (ingredients) massage += "ingredients, ";
      if (vidio_step) massage += "vidio_step, ";
      if (user_id) massage += " user_id, ";

      const editRecipe = await model.editedRecipe(
        inputTitle_recipe,
        inputImage,
        inputIngredients,
        inputVidio_step,
        inputuser_id,
        id
      );
      res.status(200).send(`${massage}berhasil di edit`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const getDataRecipe = await model.findRecipeByID(id);
    if (getDataRecipe?.rowCount) {
      const deleteRecipe = await model.deletedRecipeByID(id);
      res.send(`recipe id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const commentByRecipe = async (req, res) => {
  try {
    const { title_recipe } = req.query;
    const getDataRecipe = await model.findRecipeByTitle(title_recipe);
    if (getDataRecipe?.rowCount) {
      console.log(getDataRecipe);
      const ids = getDataRecipe.rows.map((res) => res.id);
      const getCommentUser = await model.getCommentUser(ids);
      res.status(200).json({
        recipe: getDataRecipe.rows,
        comment: getCommentUser.rows,
        jumlahData: getCommentUser?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getRecipe,
  getRecipePage,
  getNewestRecipe,
  findRecipe,
  addNewRecipe,
  editRecipe,
  deleteRecipe,
  commentByRecipe,
};
