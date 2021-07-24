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

router.get("/posts", blogController.getAllBlogPost);
router.get("/posts/frontend", blogController.getFrontendTag);
router.get("/posts/backend", blogController.getBackendTag);
router.get("/posts/fullstack", blogController.getFullstackTag);
router.get("/posts/travelling", blogController.getTravellingTag);
router.get("/posts/technology", blogController.getTechnologyTag);

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
