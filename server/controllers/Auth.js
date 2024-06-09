const bcrypt=require("bcrypt");
const User=require("../model/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.signup=async(req, res)=>{
    try{
        const {firstName, lastName, email, password, confirmPassword, role}=req.body;
        console.log(firstName, lastName, email, password, confirmPassword, role);

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            });
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords does not match",
            });
        }

        let hashedPasswords, hashedConfirmPassword;
        try{
            hashedPasswords=await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing Password",
            });
        }
        try{
            hashedConfirmPassword=await bcrypt.hash(confirmPassword, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing Confirm Password",
            });
        }

        let user=await User.create({
            firstName, lastName, email, password:hashedPasswords, confirmPassword:hashedConfirmPassword, role
        });
        console.log("user->", user);
        
        // console.log("user1 ",user);
        const payload={
            firstName, lastName, email, id:user._id,
        };

        let token=jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});
        // console.log("user2 ",user);

        user=user.toObject();
        user.token=token;
        user.password=undefined;
        user.confirmPassword=undefined;

        let options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        };

        // console.log("user final ",user);
        // console.log("token", token);

        return res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User created successfully",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again later",
        });
    }
}

exports.login=async(req, res)=>{
    try{
        const {email, password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all details carefully",
            });
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"No such user exist",
            });
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };
        
        if(await bcrypt.compare(password, user.password)){
            let token=jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            // console.log("here");
            // const oldUser={...user, token};
            // oldUser.password=undefined;
            // console.log(oldUser);
            user=user.toObject();
            user.password=undefined;
            user.confirmPassword=undefined;
            user.token=token;
            console.log(user);
                
            // console.log("here");
            const options1={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            };

            return res.cookie("token", token, options1).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Incorrect Password",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure"
        });
    }
}