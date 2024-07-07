const SOCKET_CMD_RECIVE = {
  candidate: "candidate",
  offer: "offer",
  answer: "answer", 
  connected: "client-websocket-connected",
  acceptCall: "accept-call",
  calling: "calling",
  hangUp: 'hang-up'
};

const SOCKET_CMD_SEND = {
  calling: "calling",
  acceptCall: "accept-call",
  offer: "offer",
  answer: "answer",
  candidate: "candidate",
  hangUp: 'hang-up'
};

module.exports = {
  SOCKET_CMD_SEND,
  SOCKET_CMD_RECIVE,
};
