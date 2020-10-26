var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
const crypto = express("crypto");

// 用于操作Documents的连接
var connection = require("../db/stock/stock");

// 定义一个Schema用于操作CURD
var UserSchema = new mongoose.Schema(
	{
		uid: String,
		password: String,
		username: String,
		email: String,
		enabled: Boolean,
		regDate: Date,
		roles: Array,
		github: String,
		gitee: String,
		nickname: String,
	},
	//  不要版本键 "__v"
	{ versionKey: false }
);

router.post("/", function (req, res, next) {
	// 指定一个集合
	let ListModel = connection.model("user", ListSchema, "user");
	console.log("发送的请求", req.body);
	// 在该集合中作CURD操作
	let md5 = crypto.createHash("md5");
	let md5Crypto = md5.update(req.body.password);
	let param = { password: md5Crypto.digest(), username: req.body.username };
	console.log("param", param);
	ListModel.find(param, { _id: 0 }).then((data) => {
		if (data.length >= 1) {
			req.session.login = true;
			res.send({ code: "200", status: "", msg: "登录成功" });
		} else {
			res.send(data);
			req.session.login = false;
		}
	});
});

module.exports = router;
