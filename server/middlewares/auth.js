const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req, res, next)=>{
    try{
        // console.log("cookie ", req.cookies.token);
        // console.log("body ", req.body.token);
        // console.log("hii");
        const token=req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        if(!token || token==undefined){
            return res.status(401).json({
                success:false,
                message:"Token missing",
            });
        }
        try{
            const payload=jwt.verify(token, process.env.JWT_SECRET);
            // console.log(payload);

            req.user=payload;
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong",
        });
    }
}

exports.isApprentice=(req, res)=>{
    try{
        // console.log(`use role is ${req.user.role}`);
        if(req.user.role!=="apprentice"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for apprentice",
            });
        }
        next();
    }
    catch(error){
        // console.log("hellooo2");
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}

exports.isAdmin=(req, res, next)=>{
    try{
        // console.log(`use role is ${req.user.role}`);
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin",
            });
        }
        next();
    }
    catch(error){
        // console.log("hello2");
        return res.status(500).json({
            success:false,
            message:"Role is not matching",
        });
    }
}