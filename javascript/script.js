window.onload = function () {
    window.addEventListener("keydown", moveSomething, false);
    var myCanvas = document.getElementById("myCanvas");
    var curColor = $('#selectColor option:selected').val();
    var isDown      = false;
    var ctx = myCanvas.getContext("2d");
    var img = document.getElementById("wall");

    var x = myCanvas.width/2;
    var y = myCanvas.height-30;
    var dx = 0;
    var dy = 0;
    drawBricks();

    function drawBall() {
        ctx.beginPath();
        if (x < 0) {
            x = 0;
            dx = 0;
        }
        if (y > myCanvas.width-40) {
            y = myCanvas.width-40;
            dy = 0;
        }
        ctx.rect(x, y, 20, 20);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.drawImage(img, 80, 70, 30, 650);
        ctx.drawImage(img, 680, 70, 30, 650);
        ctx.drawImage(img, 180, 180, 120, 120);
        ctx.drawImage(img, 180, 500, 120, 120);
        ctx.drawImage(img, 500, 180, 120, 120);
        ctx.drawImage(img, 500, 500, 120, 120);
        ctx.drawImage(img, 340, 340, 120, 100);
    }

    function draw() {
        drawBricks();
        drawBall();
        x += dx;
        y += dy;
    }

   // setInterval(draw, 10);

    var canvasX, canvasY;
    ctx.lineWidth = 5;

    var socket = io.connect('http://localhost:4200');

    function moveSomething(e) {
            switch (e.keyCode) {
                case 37:
                    console.log("key code :: " + e.keyCode);
                    dx -= 1;
                    break;
                case 38:
                    console.log("key code :: " + e.keyCode);
                    dy -= 1;
                    break;
                case 39:
                    console.log("key code :: " + e.keyCode);
                    dx += 1;
                    break;
                case 40:
                    console.log("key code :: " + e.keyCode);
                    dy += 1;
                    break;
            }
            e.preventDefault();
            draw();
        }
    };

/*    function mouseDown(e) {
        isDown = true;
        ctx.beginPath();
        canvasX = e.pageX - myCanvas.offsetLeft;
        canvasY = e.pageY - myCanvas.offsetTop;
        ctx.moveTo(canvasX, canvasY);
        socket.emit("mouseDown",{canvasX,canvasY});
    }

    function mouseMove(e) {
        if(isDown !== false) {
            canvasX = e.pageX - myCanvas.offsetLeft;
            canvasY = e.pageY - myCanvas.offsetTop;
            ctx.lineTo(canvasX, canvasY);
            ctx.strokeStyle = curColor;
            ctx.stroke();
            socket.emit("mouseMove",{canvasX,canvasY,curColor});

        }
    }

    function mouseUp(e) {
        isDown = false;
        ctx.closePath();

    }

    $('#selectColor').change(function () {
        curColor = $('#selectColor option:selected').val();
    });


    socket.on("mouseDownClient", data=> {
        isDown = true;
        ctx.beginPath();
        ctx.moveTo(data.canvasX, data.canvasY);
    });

    socket.on("mouseMoveClient", data=> {
        ctx.lineTo(data.canvasX, data.canvasY);
        ctx.strokeStyle = data.curColor;
        ctx.stroke();
    });*/


