const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    user_id:{
        type:String,
        unique:true,
    },

    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin", "apprentice"],
    },
    registeredOn:{
        type:Date,
        default:Date.now,
    },

    department:{
        type:String,
    },
    face_encoding:{
        type:[Number]
    }

});

const attendanceSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    timeIn:{
        type:Date,
    },
    timeOut:{
        type:Date,
    },
    status:{
        type:String,
        enum:["present", "absent", "late"],
        default:"absent",
    }
});

const leaveSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
    },
    leaveStartDate:{
        type:Date,
        required:true,
    },
    leaveEndDate:{
        type:Date,
        required:true,
    },
    reason:{
        type:String,
    },
    status:{
        type:String,
        enum:["pending", "approved", "rejected"],
        default:"pending"
    },
});

module.exports=mongoose.model("user", userSchema);

module.exports=mongoose.model("attendance", attendanceSchema);
module.exports=mongoose.model("leave", leaveSchema);