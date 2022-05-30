const express = require("express");
const router = express.Router();
const Api = require("../controllers/api");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  fileName: function (req, file, cb) {
    cb(null, file.feildName + "_" + Date.now() + "_" + file.originalname);
  },
});

let uploads = multer({
  storage: storage,
}).single("image");

router.get("/", Api.fetchAllBlogs);
router.get("/:id", Api.fetchpostById);
router.post("/", uploads, Api.createPost);
router.patch("/:id", Api.updateAPost); //allow update record partially
router.delete("/:id", Api.deletePost);

module.exports = router;
