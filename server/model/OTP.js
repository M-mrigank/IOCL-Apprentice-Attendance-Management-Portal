const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate=require("../mailFormat/emailVerificationTemplate");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

async function sendEmailVerification(email, otp){
    try{
        console.log("otp after schema above model->", otp);
        console.log("email after schema above model->", email);
        const mailResponse=await mailSender(email, "Email verification by IOCL", emailTemplate(otp));

        console.log("Email send successfully: ", mailResponse);

    }catch(error){
        console.log("error occured while sending mail: ", error.message);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendEmailVerification(this.email, this.otp);
    next();
});

module.exports=mongoose.model("OTP", OTPSchema);