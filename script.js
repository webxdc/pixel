var gridWidth = 30;
var gridHeight = 30;
var pixels = [];
for (let i = 0; i < gridWidth * gridHeight; i++) {
  pixels.push(false);
}

function init() {
  function draw() {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    var pixelWidth = canvas.width / gridWidth;
    var pixelHeight = canvas.height / gridHeight;
    for (var i = 1; i < gridWidth; i++) {
      var x = pixelWidth * i;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (var j = 1; j < gridHeight; j++) {
      var y = pixelHeight * j;
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function drawPixel(i, j) {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    var pixelWidth = canvas.width / gridWidth;
    var pixelHeight = canvas.height / gridHeight;
    var x = (canvas.width / gridWidth) * i;
    var y = (canvas.height / gridHeight) * j;
    if (pixels[j * gridHeight + i]) {
      ctx.fillRect(x, y, pixelWidth, pixelHeight);
    } else {
      ctx.clearRect(x, y, pixelWidth, pixelHeight);
    }
  }

  window.webxdc.setUpdateListener(function (update) {
    console.log(update);
    let x = update.payload.x;
    let y = update.payload.y;
    pixels[y * gridHeight + x] = update.payload.enabled;
    drawPixel(x, y);
  });

  var canvas = document.getElementById("mycanvas");

  function mouseDownHandler(event) {
    var rect = canvas.getBoundingClientRect();
    var gridXPos = Math.floor(
      ((event.clientX - rect.left) / rect.width) * gridWidth
    );
    var gridYPos = Math.floor(
      ((event.clientY - rect.top) / rect.height) * gridHeight
    );

    window.webxdc.sendUpdate(
      {
        payload: {
          x: gridXPos,
          y: gridYPos,
          enabled: !pixels[gridYPos * gridHeight + gridXPos],
        },
      },
      "pixel update"
    );
  }

  canvas.addEventListener("mousedown", mouseDownHandler);
  draw();
}

(function () {
  init();
})();
