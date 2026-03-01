const ImageKit = require("imagekit");
const mongoose = require("mongoose")
const imageKit = new ImageKit({
  publicKey:process.env.IMAGEKIT_PUBLICKEY,
  privateKey:process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint:process.env.IMAGEKIT_URLENDPOINT
});

const fileupload = (file) => {
  return new Promise((resolve, reject) => {
    imageKit.upload(
      {
        file: file.buffer,
        fileName: new mongoose.Types.ObjectId().toString(),
        folder: "moodify_songs"
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};
module.exports = fileupload;
