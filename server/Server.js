const app = require('./App.js'),
server = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //This tells the socket which port the frontend is running on so it can track
        methods: ["GET","POST"], //Tells the socket which commands it will be receiving from the frontend
    },
});

//This checks if a user opened the website
io.on("connection", (socket) => { 
    //console.log(socket.id);
 
     socket.on("join_room", (roomId) => { //Server waits for client to connect
         
         var room = Number(roomId); //Convert the room id into a number
         socket.join(room);//Needs to be roomId
         //console.log("User joined room: " + roomId);//Needs to be roomId
     });
 
     socket.on("send_message", (messageData) => {
        //  console.log("Correct Room ID: " + messageData.roomId);
        //  console.log("Patient That Sent Message: " + messageData.patientId);
        //  console.log("Socket Message Emitted: " + messageData.message);
 
         var room = Number(messageData.roomId); //Convert the roomId into a number
         socket.to(room).emit("receive_message",messageData); // The socket.listen on the frontend LiveChat.js page will catch this message since they are both using "receive_message".
     });
 
     socket.on("disconnect", () => { //Checks if a user has left the website. i.e closed the socket connection
        //  console.log("user disconnected");
     });
 });

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));