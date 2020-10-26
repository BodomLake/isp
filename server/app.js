var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
// session管理器
var session = require("express-session");

// 导出各个路由
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var matchRouter = require("./routes/match");
var tableRouter = require("./routes/table");
var loginRouter = require("./routes/login");
var app = express();

app.set("trust proxy", 1);
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
	})
);

// 设置跨域访问
// /*
app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "http://localhost:3001");
	//带上cookie
	res.header("Access-Control-Allow-Crendentials", true);
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	//让options尝试请求快速结束
	if (req.method.toLowerCase() == "options") {
		res.send(200);
		next();
	}

	// 登录 登出 注册 不需要 登录后的权限
	if (req.params === "login" || "register" || "logout") {
		next();
	}
	// 如果登录了，就放行
	if (!req.session.login) {
		next();
	} else {
		let resObj = {
			code: 403,
			msg: "未登录",
		};
		res.sendStatus(403);
		// 就此为止，不再res.send()
		// next();
	}
});
// 设置需要 登录权限的接口
app.all("*", function (req, res, next) {});
// */

// 设置模板存放的目录
app.set("views", path.join(__dirname, "views"));

// 把html文件视为 和 ejs一样的模板文件来渲染！而不是以静态文件的形式输出到浏览器
app.engine(".html", require("ejs").__express);
app.set("view engine", "html");

// 等同于设置ejs输出端口 renderFile 输出文件字节流
// app.engine('html', require('ejs').renderFile);
// app.set("view engine", "ejs");

/* 设置本application要用到的各种中间件middleware */

// 设置日志打印级别（dev:开发,test:测试,prod:生产）
app.use(logger("dev"));

// 启用express自带的json解析器
app.use(express.json());

// url编码器解析器的设置，设置为querystring library解析(extended=false)，设置参数最多限制1000个(默认1000)
app.use(express.urlencoded({ extended: false, parameterLimit: 1000 }));

// cookie解析器设置
app.use(cookieParser());

// 启用静态资源，并且设置静态资源路径
app.use(express.static(path.join(__dirname, "public")));

// 连接mongodb，并且从模块导出给各级应用
var connection = require("./db/stock/stock");
const { ws } = require("./routes/index");

// 配置路由
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/match", matchRouter);
app.use("/table", tableRouter);
app.use("/login", loginRouter);

// 获取express-websocket 服务器
// expressWs方法将app对象传入
var expressWS = require("express-ws")(app);
// 加载ws路由，必须在启动express-websocket 服务器之后
var wsRouter = require("./routes/ws");
// 给ws通讯定义路由 （works with routers）
app.use("/ws", wsRouter);
// 8080端口 设置为 websocket专用端口
app.listen(8080)

// catch 404 and forward to error handler
// 404捕捉与错误导向页面
app.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that!");
	next(createError(404));
});

// error handler
// 设置错误处理器
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// 渲染出错误提示页面并且返回给浏览器
	res.status(err.status || 500);
});

module.exports = app;
module.connection = connection;
