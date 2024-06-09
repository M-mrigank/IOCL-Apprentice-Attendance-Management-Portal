const mongoose=require("mongoose");
const User=require("../model/User");

exports.getAllApprentice=async(req, res)=>{
    try{
        const allApprentice=await User.find();
        const allApprenticeDetails=[];
        allApprentice.forEach(apprentice=>{
            apprentice?.role==="apprentice" &&allApprenticeDetails.push({
                _id:apprentice._id,
                firstName:apprentice.firstName,
                lastName:apprentice.lastName,
                email:apprentice.email,
                registeredOn:apprentice.registeredOn,
            });
        })

        return res.status(200).json({
            success:true,
            allApprenticeDetails,
            message:"Fetched all records successfully",
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching records!",
        })
    }
}

exports.updateProfile=async(req, res)=>{
    try{
        const {id:_id}=req.params;
        const {firstName, lastName, email}=req.body;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({
                success:false,
                message:"No such user exist",
            });
        }

        const updateProfile=await User.findByIdAndUpdate(_id, {
            $set:{
                firstName:firstName,
                lastName:lastName,
                email:email,
            }
        }, {new:true});

        return res.status(200).json({
            success:true,
            updateProfile,
            message:"Profile update successfully",
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while updating profile",
        });
    }
}