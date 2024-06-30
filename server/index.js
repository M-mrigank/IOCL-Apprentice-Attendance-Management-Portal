const express=require("express");
const app=express();

const cors=require("cors");
app.use(cors());

const cookieParser=require("cookie-parser");
app.use(cookieParser());

require('dotenv').config();
const PORT=process.env.PORT || 3000;

app.use(express.json());

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/temp/',
}));

require("./config/database").connect();
require("./config/cloudinary").cloudinaryConnect();

const user=require("./routes/user");
const upload=require("./routes/fileUpload");

app.get('/', (req, res)=>{
    return res.json({
        success:true,
        message:"Server connected and running",
    });
});

app.use(
    cors({
        // origin:"http://localhost:3000",
        origin:"https://iocl-frontend.vercel.app/",
        credentials:true
    })
);

app.use("/api/v1", user);
app.use("/api/v1/Upload", upload);


app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
});