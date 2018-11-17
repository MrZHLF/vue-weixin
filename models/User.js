const mongoose = require("mongoose");
const  Schema = mongoose. Schema;  /* 是指数据库的模式结构定义 */

const UserSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	avatar:{
		type:String,
	},
	date:{
		type:Date,
		default:Date.now
	}
})


module.exports = User = mongoose.model("users",UserSchema);