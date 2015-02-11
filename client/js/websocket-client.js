// task 1.3: establish a connection with the WebSocket server
var ws = new WebSocket('wss://' + document.domain);


// task 2.1: create a wrapper function to send messages to server
function sendToServer(messageType, value) {
	var serverMessage = {
												'type': messageType,
												'value': value
											};
	ws.send(JSON.stringify(serverMessage));
}


// task 3.1: add message handlers for incoming WebSocket events
/*  
ws.onmessage = function(message) {
	var data = JSON.parse(message.data);
	switch(data.type) {
		case 'draw': 
									drawEventDelegate(data.value);
									break;
		case 'clear':
									clearEventDelegate();
									break;
		default:
									break;
	}								
};
*/