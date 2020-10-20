const { Sequelize, DataTypes } = require("sequelize");

// 分别传递参数 (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// 分别传递参数 (其它数据库)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
// });


console.log("数据库初始化...");
const isp_db = new Sequelize("isp", "root", "rex123456", {
  host: "139.155.38.217",
  dialect: "mysql",
  logging: (...msg) => {
    console.log(msg);
  },
});

const sh_db = new Sequelize("sh_finance", "root", "rex123456", {
  host: "139.155.38.217",
  dialect: "mysql",
  logging: (...msg) => console.log(msg),
});

const sz_db = new Sequelize("sz_finance", "root", "rex123456", {
  host: "139.155.38.217",
  dialect: "mysql",
  logging: (...msg) => console.log(msg),
  success: function () {},
});

// 使用 .authenticate() 函数测试连接是否正常

async function testDB() {
  try {
    await isp_db.authenticate().then((res) => {
      console.log("ISP2用户:Connection has been established successfully.");
    });
    /*
    await isp_db.query("SELECT * from isp.user limit 0,2", { type: Sequelize.QueryTypes.SELECT })
       .then((res) => {
         console.log("ISP查询结果集:",'\n', res);
       });
    */
    await sh_db.authenticate();
    await console.log(
      "沪市财报：Connection has been established successfully."
    );
    await sz_db.authenticate();
    console.log("深市财报：Connection has been established successfully.");
  } catch (error) {
    console.error("无法连接到数据库:", error);
  }
}

module.exports = { isp_db, sh_db, sz_db, testDB };
