// const mongoose=require("mongoose");

// require("dotenv").config();

// exports.connect=()=>{
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     })
//     .then(()=>{console.log("DB connected successfully")})
//     .catch((err)=>{
//         console.logconsole.log("DB connection issues");
//         console.log(err);process.exit(1);
//     })
// }
const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
