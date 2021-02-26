const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

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
    err.errorStatus = 422;

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
      .catch((err) => console.log("Error : ", err));
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
  BlogPost.findById(req.params.postId)
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
