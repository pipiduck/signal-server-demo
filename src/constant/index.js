const SOCKET_CMD_RECIVE = {
  candidate: "candidate",
  offer: "offer",
  answer: "answer", 
  connected: "client-websocket-connected",
  acceptCall: "accept-call",
  calling: "calling",
};

const SOCKET_CMD_SEND = {
  calling: "calling",
  acceptCall: "accept-call",
  offer: "offer",
  answer: "answer",
  candidate: "candidate",
};

module.exports = {
  SOCKET_CMD_SEND,
  SOCKET_CMD_RECIVE,
};
