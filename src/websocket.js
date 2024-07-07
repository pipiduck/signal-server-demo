// https://www.liaoxuefeng.com/wiki/1022910821149312/1103327377678688

const WebSocket = require("ws");
const url = require("url");
const { SOCKET_CMD_RECIVE, SOCKET_CMD_SEND } = require("./constant");

const socketPool = {}; // websocket连接池

const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  // 与客户端每次建立websocket连接都会触发connection事件
  // wss.clients.size 当前连接数
  wss.on("connection", (ws, req) => {
    // 提取url中的user参数
    const parsedUrl = url.parse(req.url, true);
    const userId = parsedUrl.query["user"];

    socketPool[userId] = ws;

    ws.on("message", onMessage);
  });
};

function onMessage(message) {
  const { cmd, payload = {} } = JSON.parse(message);
  console.log(`ws Received`, cmd, payload, Object.keys(socketPool));
  const recieveWs = socketPool[payload.to];

  switch (cmd) {
    // 转发呼叫信息
    case SOCKET_CMD_RECIVE.calling:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.calling,
          payload: {
            from: payload.from,
            to: payload.to,
          },
        })
      );
      break;
    // 转发呼叫应答信息
    case SOCKET_CMD_RECIVE.acceptCall:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.acceptCall,
          payload: {
            from: payload.from,
            to: payload.to,
          },
        })
      );
      break;
    // 转发sdp-offer
    case SOCKET_CMD_RECIVE.offer:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.offer,
          payload: {
            from: payload.from,
            to: payload.to,
            offer: payload.offer,
          },
        })
      );
      break;
    // 转发sdp-answer
    case SOCKET_CMD_RECIVE.answer:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.answer,
          payload: {
            from: payload.from,
            to: payload.to,
            answer: payload.answer,
          },
        })
      );
      break;
    // 转发ice
    case SOCKET_CMD_RECIVE.candidate:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.candidate,
          payload: {
            from: payload.from,
            to: payload.to,
            candidate: payload.candidate,
          },
        })
      );
      break;
    // 通知对端挂断通话
    case SOCKET_CMD_RECIVE.hangUp:
      recieveWs?.send(
        JSON.stringify({
          cmd: SOCKET_CMD_SEND.hangUp,
          payload: {
            from: payload.from,
            to: payload.to,
          },
        })
      );
      break;
    default:
      break;
  }
}

module.exports = { initWebSocket };
