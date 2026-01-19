import dotenv from "dotenv";
dotenv.config();
// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary"; // Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export const cloudinarySignature = (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "ecomAssets";
  const paramsToSign = {
    timestamp,
    folder,
  };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.API_SECRET,
  );
  const signatureData = {
    signature,
    timestamp,
    apiKey: process.env.API_KEY,
    cloudName: process.env.CLOUD_NAME,
    folder,
  };
  console.log(signatureData);
  return res.status(200).json({
    msg: "signature generated",
    signatureData,
  });
};
