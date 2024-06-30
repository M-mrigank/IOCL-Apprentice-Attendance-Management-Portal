const nodemailer=require("nodemailer");

const mailSender=async(email, title, body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
        console.log("transporter: ", transporter);

        let info=await transporter.sendMail({
            from:"Indian Oil corporation Ltd || Project-Apprentice and Administration Portal",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        console.log("email ", info);

        return info;
    }
    catch(error){
        console.log("nodemailer error: ",error.message);
    }
}

module.exports=mailSender;