const File=require("../model/File");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async (req, res)=>{
    try{
        const file=req.files.file;

        // console.log("file is here", file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        // console.log("Path ", path);

        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"File uploaded successfully",
        });
    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options={folder};
    // console.log(file.tempFilePath);
    options.resource_type="auto";
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload=async(req, res)=>{
    try{
        const {firstName, lastName, tags, email}=req.body;
        // console.log(firstName, lastName, tags, email);

        const file=req.files.imageFile;
        // console.log(file);
        const supportedTypes=["jpg", "jpeg", "png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        // console.log(fileType);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            });
        }
        const response=await uploadFileToCloudinary(file, "StorageFiles");
        // console.log("response", response);
        const fileData=await File.create({
            firstName, 
            lastName,
            tags,
            email,
            imageUrl:response.secure_url,
        });
        // console.log(fileData);

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded",
        });

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while uploading file",
        });
    }
}

exports.videoUpload=async (req, res)=>{
    try{
        const {firstName, lastName, tags, email}=req.body;
        // console.log(firstName, lastName, tags, email);

        const file=req.files.videoFile;

        const supportedTypes=["mp4", "mov", "gif"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            });
        }

        const response=await uploadFileToCloudinary(file, "StorageFiles");
        // console.log(response);

        const fileData=await File.create({
            firstName,
            lastName,
            email,
            tags,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:"Video successfully uploaded",
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            succes:false,
            message:"Something went wrong while uploading video",
        });
    }
}

exports.imageSizeReducer=async (req, res)=>{
    try{
        const {firstName, lastName, tags, email}=req.body;
        // console.log(firstName, lastName, tags, email);

        const file=req.files.imageFile;
        // console.log(file);
        const supportedType=["jpg", "jpeg", "png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedType)){
            return res.status(400).json({
                success:false,
                message:"Invalid file format",
            });
        };

        const response=await uploadFileToCloudinary(file, "StorageFiles", 30);
        // console.log(response);

        const fileData=await File.create({
            firstName,
            lastName,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            message:"Image successfully reduced",
            imageUrl:response.secure_url,
        });

    }catch(error){
        console.log(error);
        return res.status(400).json({
            succes:false,
            message:"Something went wrong while reducing size of image",
        });
    }
}