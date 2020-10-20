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

// 根据code来匹配对应的股票
router.get("/getStockByCode/:code", function (req, res, next) {
  // 指定一个集合
  let ListModel = connection.model("list", ListSchema, "list");
  console.log("发送的请求", req.params.code);
  // 在该集合中作CURD操作
  ListModel.find({ code: req.params.code }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});

// 根据名字来匹配股票（全名匹配）
router.get("/getStockByName/:name", function (req, res, next) {
  // 指定一个集合
  let ListModel = connection.model("list", ListSchema, "list");
  console.log("发送的请求", req.params.name);
  // 在该集合中作CURD操作
  ListModel.find({ name: req.params.name }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});
// 一般股票
router.get("/loadIndicators", function (req, res, next) {
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  // 在该集合中作CURD操作
  FinanceModel.find({ code: "300724" }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});

// 券商类股票
router.get("/loadIndicatorsForBroker", function (req, res, next) {
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  // 在该集合中作CURD操作
  FinanceModel.find({ code: "600030" }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});

// 银行类股票
router.get("/loadIndicatorsForBank", function (req, res, next) {
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  // 在该集合中作CURD操作
  FinanceModel.find({ code: "600000" }, { _id: 0 }).then((data) => {
    res.send(data);
  });
});

// 匹配财报（分2次查询，第二次用多任务Promise并列执行异步查询任务，并且用Promise.all()方法返回异步结果的集合，再扁平化输出 ）
/*
router.post("/quickMatch", function (req, res, next) {
  console.log('查询用的参数体:', req.body);
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  let ListModel = connection.model("list", ListSchema, "list");
  FinanceModel.find(req.body, { code: 1, _id: 0, name: 1 })
    .then((data) => {
      console.log("查询到数据：", data);
      let promiseArray = ((arr) => {
        let promiseArray = [];
        // 同时多个异步查询
        arr.forEach((a) => {
          let p = ListModel.find({ name: a.name, market: { $ne: "港股" } });
          promiseArray.push(p);
        });
        return promiseArray;
      })(data);
      return Promise.all(promiseArray);
    })
    .then((data) => {
      res.send(data.flat());
    });
});

*/
// 匹配财报（根据查询财务报表的结果得到名字和代码，在根据 $in:[] 在list表中查询出股票的相关信息）
router.post("/quickMatch", function (req, res, next) {
  // console.log('查询用的参数体:', req.body);
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  let ListModel = connection.model("list", ListSchema, "list");
  FinanceModel.find(req.body, { code: 1, _id: 0, name: 1 })
    .then((data) => {
      console.log("查询到数据：", data);
      let names = data.map((e) => {
        return e.name;
      });
      return ListModel.find(
        {
          name: {
            $in: names,
          }
        },
        { _id: 0 }
      );
    })
    .then((data) => {
      res.send(data.flat());
    });
});

// 带有财务数据的查询，是使用了aggregate的联合查询
/*
router.post("/quickMatch", function (req, res, next) {
  console.log("查询用的参数体:", req.body);
  // 指定一个集合
  let FinanceModel = connection.model("finance", FinanceSchema, "finance");
  let ListModel = connection.model("list", ListSchema, "list");
  FinanceModel.find(req.body, { code: 1, _id: 0, name: 1 })
    .then((data) => {
      console.log("查询到数据：", data);
      let names = data.map((e) => {
        return e.name;
      });
      // 对应 sql 语句
      // select l.* , f.name as 'report' from list l left join finance f on f.name = l.name
      return ListModel.aggregate([
        {
          $lookup: {
            from: "finance",
            localField: "name",
            foreignField: "name",
            as: "report",
          },
        },
        {
          $match: {
            name: {
              $in: names,
            },
            market: { $ne: "港股" },
          },
        },
        {
          $project: {
            _id: 0,
            "report.tables": 1,
            market: 1,
            marketType: 1,
            code: 1,
          },
        },
      ]);
    })
    .then((data) => {
      // 数据量太大，只好一次选择一个元素作为返回和调试显示
      console.log(data[0]);
      res.send(data[0]);
    });
});
*/
module.exports = router;
