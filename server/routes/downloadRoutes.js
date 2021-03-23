const express = require("express");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

const router = express.Router();

const s3 = new AWS.S3({
  signatureVersion: "v4",
  accessKeyID: process.env.AMAZON_ACESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

router.get("/", (req, res) => {
  s3.getSignedUrl(
    "getObject",
    {
      Bucket: "download-hemanta-cv",
      ResponseContentType: "application/pdf",
      Key: "CV_Hemanta_Sundaray.pdf",
      Expires: 60,
    },
    (err, url) => {
      if (err) {
        next(err);
      } else {
        res.send(url);
      }
    }
  );
});

module.exports = router;
