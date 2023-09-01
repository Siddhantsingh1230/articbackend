import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";
import { S3Client } from "@aws-sdk/client-s3";

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
      const fileName =
        file.fieldname +
        "-" +
        Date.now().toString() +
        path.extname(file.originalname);

      cb(null, fileName);
      console.log(fileName);
      req.fileName = fileName;
    },
  }),
});

export const deleteFile = (file, res) => {
  s3.deleteObject(
    { Bucket: process.env.CYCLIC_BUCKET_NAME, Key: file },
    (err, data) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "File deleted successfully" });
      }
    }
  );
};

export const readFile = (file, res) => {
  const params = {
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: file,
  };

  // Generate a public URL for the S3 object
  s3.getSignedUrl("getObject", params, (err, url) => {
    if (err) {
      console.error("Error generating file URL:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({ success: true, fileUrl: url });
  });
};

export const fileExist = (file,res) =>{
  const params = {
     Bucket: process.env.CYCLIC_BUCKET_NAME, Key: file 
  }
  s3.headObject(params, function(err, data) {
    if (err && err.code === 'NotFound') {
      // console.log('File not found');
      res.status(200).json({sucess:true,foundObject:false});
    }
    else if (err) {
      res.status(404).json({sucess:false,error:err});
    }
    else {
      res.status(200).json({sucess:true,foundObject:true});
    }
  });
}