var express = require("express");
var expressWs = require("express-ws");

var router = express.Router();
expressWs(router);

router.ws("/single", function (ws, req) {
	ws.onmessage = (msg) => {
		// ws.send(msg + "!!!!!!");
		console.log(msg.data);
		// console.log(req.ip);
	};
});

router.ws("/group", function (ws, req) {
	ws.onmessage = (msg) => {
		// ws.send(msg + "!!!!!!");
		console.log(msg.data);
	};
});

module.exports = router;
