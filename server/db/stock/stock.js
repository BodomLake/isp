// stock.js file
"use strict";
var mongoose = require("mongoose");
// 连接地址，MongoDB 的服务端口为27017
// 当往其中写数据时，MongoDB下的isp数据库
const url = "mongodb://127.0.0.1:27017/isp";
// mongodb连接的兼容配置
const compatibility = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// 创建一个连接
const connection = mongoose.createConnection(url, compatibility);

// 创建schema 对应一个mongodb的集合
let StockSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
  },
  //  不要版本键 "__v"
  { versionKey: false }
);

// 连接发生错误
connection.on("err", (err) => {
  console.log("err:" + err);
});
// 连接成功
connection.on("open", () => {
  console.log("Mongoose 连接成功=> " + url);
});

// 连接异常
connection.on("error", function (err) {
  console.log("Mongoose 连接错误: " + err);
});

//连接断开
connection.on("disconnected", function () {
  console.log("Mongoose 断开连接");
});

module.exports = connection;
