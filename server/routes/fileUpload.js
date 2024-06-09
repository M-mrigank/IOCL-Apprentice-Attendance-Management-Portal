const express=require("express");
const router=express.Router();

const {localFileUpload, imageUpload, videoUpload, imageSizeReducer}=require("../controllers/FileUpload.js");

router.post("/LocalFileUpload", localFileUpload);
router.post("/ImageUpload", imageUpload);
router.post("/VideoUpload", videoUpload);
router.post("/ImageSizeReducer", imageSizeReducer);

module.exports=router;