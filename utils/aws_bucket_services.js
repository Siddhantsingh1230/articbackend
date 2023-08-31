import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import  { S3Client } from '@aws-sdk/client-s3';

// Multer s3 client
const s3Client = new S3Client();
// Create an S3 instance
const s3 = new AWS.S3();

export const uploadImage = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.CYCLIC_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
      console.log(
        file.fieldname +
          "-" +
          Date.now().toString() +
          path.extname(file.originalname)
      );
    },
  }),
});

export const deleteFile = (file) => {
  s3.deleteObject(
    { Bucket: process.env.CYCLIC_BUCKET_NAME, Key: file },
    (err, data) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    }
  );
};

export const readFile = (file,res) => {
  const params = {
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: file,
  };

  // Generate a public URL for the S3 object
  s3.getSignedUrl("getObject", params, (err, url) => {
    if (err) {
      console.error("Error generating file URL:", err);
      return res.status(500).json({success:false,message:"Internal Server Error"});
    }
    res.status(200).json({ success: true, fileUrl: url });
  });
};
