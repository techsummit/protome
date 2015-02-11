var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var drawEvents = [];          // state variable
var isBeingDragged = false;   // control variable



// handle mouse events on canvas
canvas.onmousedown = function(mouseEvent) {
  handleDrawEvent(mouseEvent);
  repaintCanvas();  
  isBeingDragged = true;
};
canvas.onmousemove = function(mouseEvent) {
  if (isBeingDragged) {
    handleDrawEvent(mouseEvent);
    repaintCanvas();  
  }  
};
canvas.onmouseup = function(mouseEvent) {
  isBeingDragged = false;
};
canvas.onmouseleave = function(mouseEvent) {
  isBeingDragged = false;
};



// event handler for drawing events
function handleDrawEvent(mouseEvent) {
  var drawEvent = {
            x: mouseEvent.pageX - canvas.offsetLeft,
            y: mouseEvent.pageY - canvas.offsetTop,
            color: $('input[name=color]:checked').val(),
            size: $('input[name=size]:checked').val(),
            wasDragged: isBeingDragged
          };
  drawEvents.push(drawEvent);

  // task 2.2: push the canvas draw event to the server 
  sendToServer('draw', drawEvent);
}



// repaints the canvas for every mouse movement inside the canvas
function repaintCanvas() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  for (var i=0; i < drawEvents.length; i++) {    
    context.beginPath();
    if( drawEvents[i].wasDragged && i ) {
      context.moveTo(drawEvents[i-1].x, drawEvents[i-1].y);
    } else {
      context.moveTo(drawEvents[i].x-1, drawEvents[i].y);
    }
    context.lineTo(drawEvents[i].x, drawEvents[i].y);
    context.closePath();   
    context.strokeStyle = drawEvents[i].color;    
    context.lineWidth = drawEvents[i].size;
    context.lineJoin = 'round';
    context.stroke();
  }
}



function clearCanvas() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  drawEvents = [];  
}



document.getElementById('clear').onclick = function() {
  clearCanvas();

  // task 2.3: push the canvas clear event to the server
  sendToServer('clear', null);
};



// task 3.2: add event delegates for WebSocket triggered events
/*
function drawEventDelegate(drawEvent) {
  drawEvents.push(drawEvent);
  repaintCanvas();
}

function clearEventDelegate() {
  clearCanvas();
}
*/