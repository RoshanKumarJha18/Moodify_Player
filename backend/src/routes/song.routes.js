const express = require("express");
const multer = require("multer");
const fileupload = require("../service/song.service");
// reason for using multer is to handle file uploads in express applications. It allows you to easily process and manage file uploads from clients, making it a popular choice for handling multipart/form-data, which is commonly used for uploading files through forms.

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); //this will store the uploaded file in memory as a buffer, rather than saving it to disk. This is useful for handling small files or when you want to process the file directly without saving it to the server's filesystem.

router.post("/song", upload.single("audio"), async(req, res) => {
  //for singlefile upload we use upload.single() and for multiple file upload we use upload.array()
  console.log(req.body);
  console.log(req.file);
  const file = await fileupload(req.file)
  console.log(file);
  res.status(201).json({
    message: "Song added successfully",
    data: req.body,
  });
});

module.exports = router;
