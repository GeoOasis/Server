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
const { app } = expressWebsockets(expressApp);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.ws("/collab", (websocket, request) => {
  HocuspocusServer.handleConnection(websocket, request);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
