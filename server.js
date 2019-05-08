var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

let messages = []; 

app.get('/', function(req, res){
  res.sendFile('/public/index.html', {root:'.'});
});

io.on('connection', function(socket){
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
  callback();

    socket.on('sendMessage', data => {
        console.log("recebendo a mensagem do cliente")
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
