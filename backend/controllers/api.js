const postSchema = require("../models/post");
const fs = require("fs");

module.exports = class Api {
  static async fetchAllBlogs(req, res) {
    try {
      const posts = await postSchema.find();
      res.status(200).json(posts);
    } catch {
      res.status(404).json({ message: "Error occured" });
    }
  }
  static async fetchpostById(req, res) {
    const id = req.params.id;
    try {
      const post = await postSchema.findById(id);
      res.status(200).json(post);
    } catch {
      res.status(404).json({ message: "Post Not Found" });
    }
  }
  static async createPost(req, res) {
    const post = req.body;
    const imageName = req.file.filename;
    post.image = imageName;
    try {
      await postSchema.create(post);
      res.status(200).json({ message: "Post created successfully" });
    } catch {
      res
        .status(400)
        .json({ message: "Post not created. Something went wrong" });
    }
  }
  static async updateAPost(req, res) {
    let id = req.params.id;
    let newImage = "";
    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync("uploads/" + req.body.old_image);
      } catch (err) {
        console.log("++++", err);
      }
    } else {
      newImage = req.body.old_image;
    }
    try {
      let newPost = req.body;
      newPost.image = newImage;
      await postSchema.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Post not updated. something went wrong" });
    }
  }
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const post = await postSchema.findByIdAndDelete(id);
      if (post.image != "") {
        try {
          fs.unlinkSync("uploads" + post.image);
        } catch (err) {
          console.log("++++", err);
        }
      }
      res.status(200).json({ message: "Post deleted Sucessfull", post });
    } catch {
      console.log({ message: "Post not deleted. Something went wrong" });
      res
        .status(404)
        .json({ message: "Post not deleted. Something went wrong" });
    }
  }
};
