const {Hocuspocus} = require('@hocuspocus/server');

const PORT = 3001;

const server = new Hocuspocus({
    port: PORT,
    async onConnect(client) {
        console.log('-------------------------------');
        console.log(`Client ${client.socketId} connected`);
        // console.log(`the number of connected clients: ${server.getConnectionsCount()}`);
    },
    async onDisconnect(client) {
        console.log('-------------------------------');
        console.log(`Client ${client.socketId} disconnected`);
        // console.log(`the number of connected clients: ${server.getConnectionsCount()}`);
    }

});

server.listen();