const User=require("../model/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

exports.resetPasswordToken=async(req, res)=>{
    try{
        const email=req.body.email;

        const user=await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Email is not registered",
            });
        }

        const token=crypto.randomUUID();

        const updateDetails=await User.findOneAndUpdate({email:email}, {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000,
        }, {new:true});

        // const url=`http://localhost:3000/update-password/${token}`;
        const url=`https://iocl-frontend.vercel.app/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Link to reset password for IOCL Apprentice and Administration Portal: ${url}`);

        return res.status(200).json({
            success:true,
            message:"Check email for password reset link (link sent successfully)",
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to send reset link"
        });
    }
}

exports.resetPassword=async(req, res)=>{
    try{
        const {password, confirmPassword, token}=req.body;

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match",
            });
        }

        const user=await User.findOne({token:token});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Token is invalid",
            });
        }

        if(user.resetPasswordExpires<Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is expired",
            });
        }

        const hashedPassword=await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({token:token}, {password:hashedPassword}, {new:true});

        return res.status(200).json({
            success:true,
            message:"Password reset Successfully",
        });

    }catch(error){
        console.log("pass reset error: ", error);
        return res.staus(400).json({
            success:false,
            message:"Failed to reset password",
        });
    }
}