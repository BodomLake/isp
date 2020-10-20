var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
// 用于操作Documents的连接
var connection = require("../db/stock/stock");

// 定义一个Schema用于操作CURD
var FinanceSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    tables: Array,
  },
  //  不要版本键 "__v"
  { versionKey: false }
);

var ListSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
  },
  //  不要版本键 "__v"
  { versionKey: false }
);

router.get("/getFinanceData/:code", function (req, res, next) {
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  FinanceModel.find({ code: req.params.code }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});

router.get("/getStock/:searchItem", function (req, res, next) {
  // 指定一个集合
  let ListModel = connection.model("list", ListSchema, "list");
  let i = req.params.searchItem;
  console.log(i);
  const regForName = new RegExp(i, "i");
  const regForCode = new RegExp(i, "i");
  let param = {
    $or: [{ code: { $regex: regForCode } }, { name: { $regex: regForName } }],
    // $and: [{ marketType: { $in: [0, 1] } }],
  };
  ListModel.find(param, { _id: 0 })
    .limit(20)
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

module.exports = router;
