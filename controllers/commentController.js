const model = require("../model/commentModel");
const db = require("../db");

const getComment = async (req, res) => {
  try {
    const getDataComment = await model.getAllComment();
    res.status(200).json({
      comment: getDataComment?.rows,
      jumlahData: getDataComment?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("ada yang error");
  }
};

const getCommentPage = async (req, res) => {
  try {
    const { limit, page } = req.body;
    const getDataComment = await model.getCommentPages(limit, page);
    if (getDataComment?.rowCount) {
      res.status(200).json({
        comment: getDataComment?.rows,
        jumlahData: getDataComment?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const findComment = async (req, res) => {
  try {
    const { id } = req.body;
    const getDataComment = await model.findCommentbyID(id);
    if (getDataComment?.rowCount) {
      res.status(200).json({
        comment: getDataComment?.rows,
        jumlahData: getDataComment?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const addComment = async (req, res) => {
  try {
    const { comment, recipe_id, user_id } = req.body;
    const postComment = await model.addedComment(comment, recipe_id, user_id);

    res.status(200).send("data berhasil di tambah");
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editComment = async (req, res) => {
  try {
    const { id, comment, recipe_id, user_id } = req.body;
    const getDataComment = await model.findCommentbyID(id);
    if (getDataComment?.rowCount) {
      let inputComment = comment || result?.rows[0].comment;
      let inputRecipe_id = recipe_id || result?.rows[0].recipe_id;
      let inputUser_id = user_id || result?.rows[0].user_id;

      let massage = "";
      if (comment) massage += "comment, ";
      if (user_id) massage += "user_id, ";
      if (recipe_id) massage += "recipe_id, ";
      const patchComment = await model.editedComment(
        inputComment,
        inputRecipe_id,
        inputUser_id,
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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    const getDataComment = await model.findCommentbyID(id);
    if (getDataComment?.rowCount) {
      const deletedComment = await model.deletedComment(id);
      res.send(`comment id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const commentByRecipe = (req, res) => {
  const { title_recipe } = req.body;
  db.query(
    `SELECT * FROM recipe WHERE title_recipe LIKE $1`,
    [`%${title_recipe}%`],
    (error, resultResep) => {
      if (error) {
        //console.log("here2");
        res.status(400).send("ada yang error");
      } else {
        const ids = resultResep.rows.map((res) => res.id);
        db.query(
          `SELECT comment.comment, userdata.name FROM comment JOIN userdata 
        ON comment.user_id = userdata.id WHERE recipe_id = ANY ($1)`,
          [ids],
          (error, result) => {
            if (error) {
              //console.log("here1", error);
              res.status(400).send("ada yang error");
            } else {
              //console.log("here");
              res.status(200).json({
                recipe: resultResep.rows,
                comment: result.rows,
                jumlahData: result?.rowCount,
              });
            }
          }
        );
      }
    }
  );
};

module.exports = {
  getComment,
  getCommentPage,
  findComment,
  addComment,
  editComment,
  deleteComment,
  commentByRecipe,
};
