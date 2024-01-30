import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const options = {
  cors: true
}

const io = new Server(server, options);

const users = new Map();
function User(user) {
  this.id = user.id;
  this.name = user.name;
  this.color = user.color;
  this.x = user.x;
  this.y = user.y;
  this.z = user.z;
}

io.on('connection', function(socket) {
    // player initialize
    socket.on('initialize', (user) => {
      let newUser = new User(user);
      users.set(user.id, newUser);
      socket.userId = user.id;

      console.log(`${newUser.name} connected!`);
      console.log("UserList.length: ",users.size);

      // 不能emit Map对象，否则会报错
      socket.emit('UserData', Array.from(users));
      socket.broadcast.emit('userJoined', newUser);
    });

    // playcanvs官方代码中把下面这些代码全部放在了第一次初始化的里边
    // 感觉没有必要啊
    // socket.on('initialize', () => {
    //   console.log("a user initialized!");
    //   let id = socket.id;
    //   let newPlayer = new Player(id);
    //   players.set(id, newPlayer);
    //   socket.emit('playerData', {id: id, players: players});
    //   socket.broadcast.emit('playerJoined', newPlayer);
    // })

    // player moved
    socket.on('positionUpdate', (user) => {
      if (!users.has(user.id)) return;
      console.log("收到move::", user.id);
      users.get(user.id).x = user.x;
      users.get(user.id).y = user.y;
      users.get(user.id).z = user.z;
      socket.broadcast.emit('userMoved', user);
    })

    // player disconnect
    socket.on('disconnect', () => {
      if (!users.has(socket.userId)) return;
      console.log(`${users.get(socket.userId).name} disconnected!`);
      socket.broadcast.emit('userLeft', users.get(socket.userId));
      users.delete(socket.userId);
    })
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});