const express = require('express');
const http = require('http');
const app = express();
app.use(express.static('./client'));

let server = http.createServer(app);

let clientList={};
let io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.emit('msg', {
        "msg": "msg"
    });
    socket.on("rtc",(d)=>{
        console.log(d)
        clientList[socket.id]={
            name:d.name,
            socketId:d.id,
            sdp_offer:d.sdp
        }
        socket.emit('offer-video',(clientList[socket.id]))
    });

});


server.listen(3000, () => {
    console.log("server is running");
})