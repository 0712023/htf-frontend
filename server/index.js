const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

var mysql_dbc = require('./db/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const { timeStamp } = require("console");
const messageStore = new InMemoryMessageStore();

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = username;
  socket.userID = username;
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  const users = [];
  const messagesPerUser = new Map();

  connection.query(`SELECT * FROM messages WHERE to_id='`+socket.userID+`' OR from_id='`+socket.userID+`'`,(err, rows)=>{
    console.log(err);
    rows.forEach((messageRow)=>{
      const message = {content: messageRow.content, from: messageRow.from_id, to: messageRow.to_id}
      const { from, to } = message;
      const otherUser = socket.userID === from ? to : from;
      if (messagesPerUser.has(otherUser)) {
        messagesPerUser.get(otherUser).push(message);
      } else {
        messagesPerUser.set(otherUser, [message]);
      }

    });
    console.log(messagesPerUser.keys());
    console.log(Array.from(messagesPerUser.keys()));
    console.log(sessionStore.findAllSessions());
    
    Array.from(messagesPerUser.keys()).forEach((userID) => {
      let connectedStatus = false;
      try {
        connectedStatus = sessionStore.findAllSessions().find(element => element.userID == userID).connected;
      } catch (error) {error}
      users.push({
        userID: userID,
        username: userID,
        connected: connectedStatus,
        messages: messagesPerUser.get(userID) || [],
      });
    });
    
    // sessionStore.findAllSessions().forEach((session) => {
    //   users.push({
    //     userID: session.userID,
    //     username: session.username,
    //     connected: session.connected,
    //     messages: messagesPerUser.get(session.userID) || [],
    //   });
    // });

    socket.emit("users", users);
  })

  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    // messages: messagesPerUser.get(socket.userID), //여기가 비어서 시작하는게 근본적인 문제
  });

  //여기가 메세지 로딩부분
  // messageStore.findMessagesForUser(socket.userID).forEach((message) => {
  //   const { from, to } = message;
  //   console.log(message);
  //   const otherUser = socket.userID === from ? to : from;
  //   if (messagesPerUser.has(otherUser)) {
  //     messagesPerUser.get(otherUser).push(message);
  //   } else {
  //     messagesPerUser.set(otherUser, [message]);
  //   }
  // });


  // sessionStore.findAllSessions().forEach((session) => {
  //   users.push({
  //     userID: session.userID,
  //     username: session.username,
  //     connected: session.connected,
  //     messages: messagesPerUser.get(session.userID) || [],
  //   });
  // });
  // socket.emit("users", users);

  // notify existing users
  // socket.broadcast.emit("user connected", {
  //   userID: socket.userID,
  //   username: socket.username,
  //   connected: true,
  //   messages: [],
  // });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", message);


    //메세지 저장부분 - 여길 db 연결 링크로 사용하면 된다.
    connection.query(`INSERT INTO messages (content, from_id, to_id, created) VALUES ('`+content+`','`+socket.userID+`','`+to+`',`+Date.now()+`)`,(err, rows)=>{
      console.log(err);
      console.log(rows);
    })
    messageStore.saveMessage(message);
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
