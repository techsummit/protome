# STEP 1: CREATING A WEBSOCKET SERVER
---

To begin with this step, run this command in console: `git checkout –f step-0`


### TASK 1.1: CREATE A WEBSOCKET SERVER
protome/websocket-server.js: 4
```
var ws = require('ws');
var webSocketServer = new ws.Server({ server: expressServer });
console.log('WebSocket server started.');
```


### TASK 1.2: HANDLE WEBSOCKET SERVER EVENTS
protome/websocket-server.js: 9
```
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
```


### TASK 1.3: ESTABLISH A CONNECTION WITH THE WEBSOCKET SERVER  
protome/client/js/websocket-client.js: 5
```
var ws = new WebSocket('wss://'+ document.domain);
```


Please make sure to save all the files. `(Ctrl+S / Cmd+S)`
Run the application by executing this command in console: `node index.js`






# STEP 2: SENDING MESSAGES FROM A WEBSOCKET CLIENT
---
To skip directly to this step, run this command in console: `git checkout –f step-1`


### TASK 2.1: CREATE A WRAPPER FUNCTION TO SEND MESSAGES TO SERVER
protome/client/js/websocket-client.js: 6
```
function sendToServer(messageType, value) {
    var serverMessage = {
                           'type': messageType,
                           'value': value
                        };
    ws.send(JSON.stringify(serverMessage));
}
```


### TASK 2.2: PUSH THE CANVAS DRAW EVENT TO THE SERVER
protome/client/js/canvas.js: 41
```
sendToServer('draw', drawEvent);
```


### TASK 2.3: PUSH THE CANVAS CLEAR EVENT TO THE SERVER
protome/client/js/canvas.js: 78
```
sendToServer('clear', null);
```


Please make sure to save all the files. `(Ctrl+S / Cmd+S)`
Run the application by executing this command in console: `node index.js`






# STEP 3: RECEIVING MESSAGES FROM A WEBSOCKET SERVER
---
To skip directly to this step, run this command in console: `git checkout –f step-2`


### TASK 3.1: ADD MESSAGE HANDLERS FOR INCOMING WEBSOCKET EVENTS
protome/client/js/websocket-client.js: 16
```
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
```


### TASK 3.2: ADD EVENT DELEGATES FOR WEBSOCKET TRIGGERED EVENTS
protome/client/js/websocket-client.js: 84
```
function drawEventDelegate(drawEvent) {
    drawEvents.push(drawEvent);
    repaintCanvas();
}

function clearEventDelegate() {
    clearCanvas();
}
```


Please make sure to save all the files. `(Ctrl+S / Cmd+S)`
Run the application by executing this command in console: `node index.js`
