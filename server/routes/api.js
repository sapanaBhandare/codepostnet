const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const post = require("../models/posts");

const db = "mongodb://0.0.0.0:27017/codepostnet";

mongoose.connect(db, function (err) {
  if (err) {
    console.log("-----connection error-----", err);
  }
});

router.get("/posts", function (req, res) {
  post.find({}).exec(function (err, posts) {
    if (err) {
      console.log("error getting the posts");
    } else {
      res.json(posts);
    }
  });
});

router.get("/details/:id", function (req, res) {
  post.findById(req.params.id).exec(function (err, post) {
    if (err) {
      console.log("error getting the post");
    } else {
      res.json(post);
    }
  });
});

router.post("/post", function (req, res) {
  var newPost = {
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    detailed_description: req.body.detailed_description,
  };
  post.create(newPost,function (err, addedPost) {
    if (err) {
      console.log("error in inserting post",err);
    } else {
      res.json(addedPost);
    }
  });
});

module.exports = router;
