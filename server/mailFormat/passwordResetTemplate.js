exports.passwordReset=(email, firstName)=>{
    `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
		<title>Password Reset confirmation || IOCL-Project</title>
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
            .email {
                font-size: 29px;
                font-weight: 700;
                margin-bottom: 20px;
                color: rgb(249, 115, 22);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://iocl-frontend.vercel.app">
            // <a href="https://localhost:3000">
                <img src="https://res.cloudinary.com/deb3uqqw7/image/upload/v1719679928/StorageFiles/lpztungtwfdm0qgosxzz.png" height="100" width="140" alt="IOCL">
            </a>
            <div class="message">Email Verification || IOCL - Project</div>
            <div class="content">
                <p>Dear ${firstName},</p>
                <p>Your Password has been successfully reset
                 for the email <span class="email">${email}</span></p>
                <p>Link is valid for % minutes only.</p>
            </div>
        </div>
    </body>
    </html>`
}