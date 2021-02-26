const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const { post } = require("../routes/blog");

exports.createBlogPost = (req, res, next) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = new Error("Input Salah");
    err.errorStatus = 400;
    err.data = errors.array();
    
    // mengirim error untuk menampilkan error dinamis
    throw err;
  }

  if(!req.file) {
    const err = new Error('Harap Upload Image');
    err.errorStatus = 400;

    // mengirim error untuk menampilkan error dinamis
    throw err;
  }
  
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  
  // save ke database
  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: "Wiby Fabian Rianto",
    },
  });

  Posting.save().then((result) => {
    res
      .status(201)
      .json({
        message: "Create Blog Post Success",
        data: result,
      })
      .catch((err) => {
        next(err)
      });
  });
};

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
  .then((result) => {
    res.status(200).json({
      message: "Blog Posts",
      data: result
    })
  })
  .catch((err) => {
    next(err);
  })
}

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
  .then((result) => {
    if(!result) {
      const err = new Error('Data Not Found');
      err.errorStatus = 404;
      throw err;
    }
    res.status(200).json({
      message: 'Find Data By Id Success',
      data: result
    })
  })
  .catch((err) => next(err));
}

exports.updateBlogPost = (req, res, next) => {

  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    const err = new Error('Input Salah');
    err.errorStatus = 400;
    err.data = errors.array();

    throw err;
  }

  if(!req.file) {
    const err = new Error('Harap Upload Image');
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
    if(!post) {
      const err = new Error('Data Not Found');
      err.errorStatus = 404;
      next(err);
    }

    // ganti postingan dengan data input baru
    post.title = title;
    post.body = body;
    post.image = image;

    return post.save();
  })
  .then((result) => {
    res.status(200).json({
      message: "Update Blog Post Success",
      data: result
    })
  })
  .catch((err) => {
    next(err);
  })
}
