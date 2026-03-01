const express = require("express");
const multer = require("multer");
const fileupload = require("../service/song.service");
const songModel = require("../models/song.model");
// reason for using multer is to handle file uploads in express applications. It allows you to easily process and manage file uploads from clients, making it a popular choice for handling multipart/form-data, which is commonly used for uploading files through forms.

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); //this will store the uploaded file in memory as a buffer, rather than saving it to disk. This is useful for handling small files or when you want to process the file directly without saving it to the server's filesystem.

router.post("/song", upload.single("audio"), async(req, res) => {
  //for singlefile upload we use upload.single() and for multiple file upload we use upload.array()
  console.log(req.body);
  console.log(req.file);//req.file can be only used when multler is used 
  const file = await fileupload(req.file)//this will upload the file to imagekit
  const moodify_data = await songModel.create({
    title:req.body.title,
    artist:req.body.artist,
    audio:file.url,
    mood:req.body.mood
  })
  console.log(file);
  res.status(201).json({
    message: "Song added successfully",
    data: moodify_data,
  });
});
router.get("/song",async(req,res)=>{
    const {mood} = req.query;
    const data = await songModel.find({
      mood:mood
    }).then((data)=>{
      res.status(200).json({
        message:"Song fetched successfully",
        data:data
      })
    })
})




module.exports = router;
