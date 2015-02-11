module.exports = function(expressServer) {
	
	// task 1.1: create a WebSocket server	
	var ws = require('ws');
	var webSocketServer = new ws.Server({ server: expressServer });
	console.log('WebSocket server started.');
	
	// task 1.2: handle WebSocket server events
	webSocketServer.on('connection', function(socket) {
		console.log('Connection opened');
	
	  socket.on('close', function() {	
			console.log('Connection closed');
		});
	
		socket.on('message', function(message) {
  		var sockets = webSocketServer.clients;	    	
    	for (var i = 0; i < sockets.length; i++) {    
		   	if (sockets[i] !== socket) {    
		     		sockets[i].send(message);      
		      }
			}
		});			 

	});
}