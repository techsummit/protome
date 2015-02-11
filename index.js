var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
app.set('ip', (process.env.IP || "0.0.0.0"));

app.use(express.static(__dirname + '/client'));

var server = app.listen(app.get('port'), app.get('ip'), function() {
	var addr = server.address();
  console.log("Node app is running at ", addr.address + ":" + addr.port);  
});

var WebSocketModule = require('./websocket-server');
WebSocketModule(server);
