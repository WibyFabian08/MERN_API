const express = require("express");
const router = express.Router();
const { body } = require("express-validator");


const blogController = require("../controllers/blog");

router.post(
  "/v1/blog/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
    body("body").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
  ],
  blogController.createBlogPost
);

router.get("/v1/blog/posts", blogController.getAllBlogPost);
router.get("/v1/blog/posts/frontend", blogController.getFrontendTag);
router.get("/v1/blog/posts/backend", blogController.getBackendTag);
router.get("/v1/blog/posts/fullstack", blogController.getFullstackTag);
router.get("/v1/blog/posts/travelling", blogController.getTravellingTag);
router.get("/v1/blog/posts/technology", blogController.getTechnologyTag);

router.get("/v1/blog/post/:postId", blogController.getBlogPostById);

router.put(
  "/v1/blog/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
    body("body").isLength({ min: 5 }).withMessage("Input Minimal 5 Karakter"),
  ],
  blogController.updateBlogPost
);

router.delete("/v1/blog/post/:postId", blogController.deleteBlogPost);

module.exports = router;
