const express=require("express");
const router=express.Router();

const {login, signup, sendOTP}=require("../controllers/Auth");
const {auth, isAdmin, isApprentice}=require("../middlewares/auth");
const { getAllApprentice, updateProfile } = require("../controllers/ApprenticeCollection");
const {resetPasswordToken, resetPassword}=require("../controllers/ResetPassword");

router.post("/Login", login);
router.post("/Signup", signup);
router.post("/sendOtp", sendOTP);

router.get("/Test", auth, (req, res)=>{
    res.json({
        success: true,
        message:"Welcome to the protected routes for test",
    })
});

router.get("/Apprentice", auth, isApprentice, (req, res)=>{
    res.json({
        success: true,
        message:"Welcome to protected route form apprentice",
    })
});
router.get("/Admin", auth, isAdmin, (req, res)=>{
    res.json({
        success: true,
        message:"Welcome to protected route form admin",
    })
});

router.get('/Record', getAllApprentice);
router.patch('update/:id', auth, updateProfile);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;