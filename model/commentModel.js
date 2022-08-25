const db = require("../db");

const getAllComment = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM comment ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getCommentPages = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM comment ORDER BY id ASC LIMIT $1 OFFSET $2`,
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

const findCommentbyID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM comment WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedComment = (comment, recipe_id, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO comment (comment, recipe_id, user_id) 
    VALUES ($1,$2,$3)`,
      [comment, recipe_id, user_id],
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

const editedComment = (inputComment, inputRecipe_id, inputUser_id, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE comment SET comment=$1,recipe_id=$2, user_id=$3 WHERE id=$4`,
      [inputComment, inputRecipe_id, inputUser_id, id],
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

const deletedComment = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM comment WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllComment,
  getCommentPages,
  findCommentbyID,
  addedComment,
  editedComment,
  deletedComment,
};
