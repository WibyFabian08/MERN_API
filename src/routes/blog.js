const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const blogController = require("../controllers/blog");

router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
    body("body").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
  ],
  blogController.createBlogPost
);

module.exports = router;
