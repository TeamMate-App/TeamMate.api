const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//get comment
router.get ('/comment', CommentsController.get);
//create comment
router.post('/comment', CommentsController.create);

router.get ('/:id/gamecomment',CommentsController.getGameComment);

module.exports = router