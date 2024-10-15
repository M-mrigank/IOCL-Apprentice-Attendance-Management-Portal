const otpTemplate=(otp)=>{
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Verification || IOCL-Project</title>
        <style>
            body {
                font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-size: 16px;
                line-height: 1.4;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: rgb(243, 217, 200);
                max-width: 600px;
                place-items: center;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .message {
                font-size: 20px;
                margin-top: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: rgb(63, 59, 58);
            }
            .content {
                font-size: 16px;
                margin-bottom: 20px;
                color: rgb(30, 41, 59);
            }
            .content1 {
                font-size: 16px;
                color: rgb(30, 41, 59);
            }
            .otp {
                font-size: 29px;
                font-weight: 700;
                margin-bottom: 20px;
                color: rgb(249, 115, 22);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!--<a href="https://localhost:3000">-->
            <a href="https://iocl-barauni-refinery.vercel.app">
                <img src="https://res.cloudinary.com/deb3uqqw7/image/upload/v1719679928/StorageFiles/lpztungtwfdm0qgosxzz.png" height="100" width="140" alt="IOCL">
            </a>
            <div class="message">Email Verification || IOCL - Project</div>
            <div class="content">
                <div class="content1">
                    <p>Dear user,</p>
                    <p>Use the following OTP to activate your account:</p>
                </div>
                <h2 class="otp">${otp}</h2>
                <p>Link is valid for 5 minutes only.</p>
            </div>
        </div>
    </body>
    </html>
`
}

module.exports=otpTemplate;