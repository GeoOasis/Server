const express = require("express");
const expressWebsockets = require("express-ws");
const { Server } = require("@hocuspocus/server");

const PORT = process.env.PORT || 3001;

const HocuspocusServer = Server.configure({
  onConnect(client) {
    console.log(`Client ${client.socketId} connected!!!`);
  },

  onDisconnect(client) {
    console.log(`Client ${client.socketId} disconnected!!!`);
  },
});

const expressApp = express();
expressApp.use(express.static("dist"));

const { app } = expressWebsockets(expressApp);

app.ws("/collab", (websocket, request) => {
  HocuspocusServer.handleConnection(websocket, request);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
