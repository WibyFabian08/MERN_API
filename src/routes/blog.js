const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const uploadProfle = require("../../middlewares/uploadProfile");

const blogController = require("../controllers/blog");

router.post(
  "/post",
  uploadProfle,
  [
    body("title").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
    body("body").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
  ],
  blogController.createBlogPost
);

router.get("/posts", blogController.getAllBlogPost);

router.get("/post/:postId", blogController.getBlogPostById);

router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
    body("body").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
  ],
  blogController.updateBlogPost
);

router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;
