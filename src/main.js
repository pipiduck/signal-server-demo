const Koa = require("koa");
const http = require("http");

const { logReq, logCostTime } = require("./middleware/logger");
const router = require("./router");
const { initWebSocket } = require("./websocket");

const app = new Koa();
app.use(logReq, logCostTime);
app.use(router.routes());

// http和ws用同一个端口
const server = http.createServer(app.callback());
initWebSocket(server);

server.listen(3322, () => {
  console.log("server is running on http://localhost:3322");
});
