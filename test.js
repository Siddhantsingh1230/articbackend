import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from 'aws-sdk';

const app = express();

const S3_BUCKET_NAME = "cyclic-silly-cyan-hermit-crab-ap-northeast-2";

// Create an S3 instance
const s3 = new AWS.S3();
// Configure AWS with your credentials
AWS.config.update({
    accessKeyId: 'ASIAUNA5PTH6NO3ZHFPQ',
    secretAccessKey: 'GBB9/s2KKdnC5EC8wZyJw9X38Ye40JP5X4AWd7xB',
    region: 'ap-northeast-2', // Replace with your AWS region
  });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "siddhant.jpg");
    },
  }),
});

s3.deleteObject({ Bucket: S3_BUCKET_NAME, Key: "siddhant.jpg" }, (err, data) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully');
    }
  });

app.get("/",(req,res)=>{
    res.send("ok");
})
app.post("/upload", upload.single("image"), function (req, res, next) {
  res.send("Successfully uploaded");
});




app.get('/read', (req, res) => {
  const imagePath = 'siddhant.jpg';

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: imagePath,
  };

  // Generate a public URL for the S3 object
  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.error('Error generating image URL:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Disposition', 'inline');
    // res.redirect(url); // Redirect to the image URL
    res.json({ imageUrl: url });
  });
});
  
app.listen(5500, (err) => {
  console.log("listening at 5500");
});
