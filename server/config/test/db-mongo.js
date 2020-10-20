// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/stock";

// MongoClient.connect(
//   url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function (err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close();
//   }
// );

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/stock", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;
con.on("error", console.error.bind(console, "连接数据库失败"));
// 一旦连接成功
con.once("open", () => {
  console.log("成功连接MongoDB");
  //定义一个schema
  let StockListSchema = new mongoose.Schema({
    code: String,
    name: String,
  });
  Schema.methods.one = function () {
    console.log(this.name);
  };
  //继承一个schema
  let Model = mongoose.model("list", Schema);
  Model.find({ code: "300724" }, (err, res) => {
    console.log(res);
  });
});
