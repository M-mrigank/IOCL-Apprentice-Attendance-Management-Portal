const bcrypt=require("bcrypt");
const User=require("../model/User");
const OTP=require("../model/OTP");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const otpGenerator=require("otp-generator");

exports.sendOTP=async(req, res)=>{
    try{
        const {email, firstName, lastName, password, confirmPassword, role}=req.body;
        console.log("email : ", email);
        console.log("req body : ", req.body);

        console.log("password is", password);

        let passlength=password.length;
        if(passlength<8){
            return res.status(400).json({
                success:false,
                message:"Password length is less than 8 characters!"
            });
        }

        let freq=new Map();
        for(let a of password){
            freq.set(a, (freq.set(a) || 0)+1);
        }
        console.log("frequency array: ", freq);

        function numpresent(freq){
            for(let i=0; i<=9; i++){
                let c=i.toString();
                console.log(`frequency of ${i} if ${freq.has(c)}`);
                if(freq.has(c))return true;
            }
            return false;
        }
        // console.log("number present", numpresent(freq));

        if(numpresent(freq)==false){
            return res.status(400).json({
                success:false,
                message:"Password should consist of atleast one integer!"
            })
        };

        function upperpresent(freq){
            for(let i=65; i<=90; i++){
                let c=String.fromCharCode(i);
                if(freq.has(c))return true;
            }
            return false;
        }
        // console.log("uppercase present", upperpresent(freq));

        if(upperpresent(freq)==false){
            return res.status(400).json({
                success:false,
                message:"Password should have atleast one uppercase letter!"
            })
        };

        console.log("nxt");

        function lowerpresent(freq){
            for(let i=97; i<=122; i++){
                let c=String.fromCharCode(i);
                if(freq.has(c))return true;
            }
            return false;
        }
        // console.log("lower case present", lowerpresent(freq));
        
        if(lowerpresent(freq)==false){
            return res.status(400).json({
                success:false,
                message:"Password should have atleast one lowercase letter!"
            })
        };
        console.log("nxt");

        function specialpresent(freq){
            if(freq.has('!') || freq.has('@') || freq.has('#') || freq.has('$') || freq.has('%') || freq.has('^') || freq.has('&') || freq.has('*') || freq.has('(') || freq.has(')') || freq.has('-') || freq.has('_') || freq.has('=') || freq.has('+') || freq.has(`'\'`) || freq.has('|') || freq.has('[') || freq.has(']') || freq.has('{') || freq.has('}') || freq.has(';') || freq.has(':') || freq.has('/') || freq.has('?') || freq.has('.') || freq.has('>'))return true;
            return false;
        }
        // console.log("special symbol present", specialpresent(freq));

        if(specialpresent(freq)==false){
            return res.status(400).json({
                success:false,
                message:"Password should have atleast one special symbol!"
            })
        };



        const checkUserPresent=await User.findOne({email});

        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            });
        }

        var otp=otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        // console.log("otp generated ", otp);

        let result=await OTP.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result=await OTP.findOne({otp:otp});
        }

        // console.log("otp generated final: ", otp);

        const otpPayload={email, otp};
        const payload={
            firstName, lastName, email, password, confirmPassword, role, otp
        };

        const otpBody=await OTP.create(otpPayload);
        // console.log(otpBody);

        return res.status(200).json({
            success:true,
            otp,
            payload,
            message:"OTP sent successfully"
        });
    }
    catch(error){
        console.log("error with otp: ", error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.signup=async(req, res)=>{
    try{
        let {firstName, lastName, email, password, confirmPassword, role,
            otp
        }=req.body;
        // console.log(firstName, lastName, email, password, confirmPassword, role, otp);
        
        let {name}=req.body;
        // console.log(name);

        if(name){
            const [first, ...second]=name.split(' ');
            const sec=second.join(' ');
            firstName=first;
            lastName=sec;
            password=`${firstName}`;
            confirmPassword=`${firstName}`;
            if(!lastName){lastName=firstName;}
        }

        if(email){
            const emailpart=email.split('@')[-1];
            if(!role){
                (emailpart==="indianoil.in")?role="admin":role="apprentice";
            }
        }
        
        if(!name){
            if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                });
            }
        }
        else{
            if(!firstName || !lastName || !email || !password || !confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                });
            }
        }
        
        if(role==="admin" && emailpart!=="indianoil.in"){
            return res.status(403).json({
                success:false,
                message:"Cannot Signup without valid Admin EmailID !",
            })
        }
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

        if(!name){
            const recentOtp1=await OTP.find({email}).sort({createdAt:-1}).limit(1);
            const recentOtp=recentOtp1[0].otp;
            // console.log("recent otp ", recentOtp);

            if(recentOtp.length==0){
                return res.status(400).json({
                    success:false,
                    message:"Otp not found"
                });
            }
            else if(otp!==recentOtp){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Otp"
                });
            }
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
        // console.log("user->", user);
        
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
        let {email, password, name}=req.body;

        if(name){
            password=name;
        }

        // console.log("login data: ", email, password);

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
            // user.confirmPassword=undefined;
            user.token=token;
            // console.log(user);
                
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