const express=require("express");
const router=express.Router();

const {login, signup}=require("../controllers/Auth");
const {auth, isAdmin, isApprentice}=require("../middlewares/auth");
const { getAllApprentice, updateProfile } = require("../controllers/ApprenticeCollection");

router.post("/Login", login);
router.post("/Signup", signup);

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

module.exports = router;