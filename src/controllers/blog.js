const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/blog");
const Tag = require("../models/tag");

exports.createBlogPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input Salah");
    err.errorStatus = 400;
    err.data = errors.array();

    // mengirim error untuk menampilkan error dinamis
    throw err;
  }

  if (!req.file) {
    const err = new Error("Harap Upload Image");
    err.errorStatus = 400;

    // mengirim error untuk menampilkan error dinamis
    throw err;
  }

  console.log(req.body.tag);

  // save ke database
  const Posting = new BlogPost({
    title: req.body.title,
    body: req.body.body,
    image: req.file.path,
    tag: req.body.tag,
    author: {
      name: req.body.name,
      profession: req.body.profession,
    },
  });

  console.log(Posting);

  await Posting.save();

  res.status(200).json({
    status: "ok",
    Posting,
  });
};

exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 20;

  BlogPost.find()
    .countDocuments()
    .then((result) => {
      let totalPosts = result;

      // pagination
      BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .sort({createdAt: -1})
        .then((result) => {
          console.log(result.data);
          res.status(200).json({
            message: "Blog Posts",
            data: result,
            current_page: parseInt(currentPage),
            per_page: parseInt(perPage),
            total_posts: totalPosts,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getFrontendTag = async (req, res) => {

  const posts = await BlogPost.find({tag: 'frontend'});

  res.status(200).json({
    status: 'ok',
    tag: 'frontend',
    data: posts
  })

}

exports.getBackendTag = async (req, res) => {

  const posts = await BlogPost.find({tag: 'backend'});

  res.status(200).json({
    status: 'ok',
    tag: 'backend',
    data: posts
  })

}

exports.getFullstackTag = async (req, res) => {

  const posts = await BlogPost.find({tag: 'fullstack'});

  res.status(200).json({
    status: 'ok',
    tag: 'fullstack',
    data: posts
  })

}

exports.getTravellingTag = async (req, res) => {

  const posts = await BlogPost.find({tag: 'travelling'});

  res.status(200).json({
    status: 'ok',
    tag: 'travelling',
    data: posts
  })

}

exports.getTechnologyTag = async (req, res) => {

  const posts = await BlogPost.find({tag: 'technology'});

  res.status(200).json({
    status: 'ok',
    tag: 'technology',
    data: posts
  })

}

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const err = new Error("Data Not Found");
        err.errorStatus = 404;
        throw err;
      }
      res.status(200).json({
        message: "Find Data By Id Success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input Salah");
    err.errorStatus = 400;
    err.data = errors.array();

    throw err;
  }

  if (!req.file) {
    const err = new Error("Harap Upload Image");
    err.errorStatus = 400;

    throw err;
  }

  // tangkap input user
  const title = req.body.title;
  const body = req.body.body;
  const image = req.file.path;

  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data Not Found");
        err.errorStatus = 404;

        throw err;
      }

      let poto = post.image;

      poto = path.join(__dirname, "../..", poto);
      fs.unlink(poto, (err) => console.log(err));

      // ganti postingan dengan data input baru
      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Update Blog Post Success",
          data: result,
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data Not Found");
        err.errorStatus = 404;

        throw err;
      }

      let image = post.image;

      image = path.join(__dirname, "../..", image);
      fs.unlink(image, (err) => console.log(err));

      return BlogPost.findByIdAndDelete(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Delete Success",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
