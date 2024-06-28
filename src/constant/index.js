const SOCKET_CMD_RECIVE = {
  candidate: "candidate",
  offer: "offer",
  answer: "answer", 
  connected: "client-websocket-connected"
};

const SOCKET_CMD_SEND = {
  calling: "calling",
  offer: "offer",
  answer: "answer",
  candidate: "candidate",
};

module.exports = {
  SOCKET_CMD_SEND,
  SOCKET_CMD_RECIVE,
};
