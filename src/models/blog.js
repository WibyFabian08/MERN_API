const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    author: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BlogPost', BlogPost);