const db = require("../db");

const getAllRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipe ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getRecipePages = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipe ORDER BY id ASC LIMIT $1 OFFSET $2 `,
      [limit, limit * (page - 1)],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const get5Recipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipe ORDER BY id DESC LIMIT 5`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const findRecipeByTitle = (title_recipe) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipe WHERE title_recipe LIKE $1`,
      [`%${title_recipe}%`],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const addedRecipe = (title_recipe, image, ingredients, vidio_step, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipe (title_recipe,image,ingredients,vidio_step,user_id) 
    VALUES ($1,$2,$3,$4,$5)`,
      [title_recipe, image, ingredients, vidio_step, user_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const findRecipeByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipe WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const editedRecipe = (
  inputTitle_recipe,
  inputImage,
  inputIngredients,
  inputVidio_step,
  inputuser_id,
  id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipe SET title_recipe= $1, image=$2, ingredients=$3, vidio_step=$4, user_id=$5 WHERE id=$6`,
      [
        inputTitle_recipe,
        inputImage,
        inputIngredients,
        inputVidio_step,
        inputuser_id,
        id,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deletedRecipeByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipe WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getCommentUser = (ids) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT comment.comment, userdata.name FROM comment JOIN userdata 
        ON comment.user_id = userdata.id WHERE recipe_id = ANY ($1)`,
      [ids],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllRecipe,
  getRecipePages,
  get5Recipe,
  findRecipeByTitle,
  addedRecipe,
  findRecipeByID,
  editedRecipe,
  deletedRecipeByID,
  getCommentUser,
};
