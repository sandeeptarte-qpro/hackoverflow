var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var url = require('url');
var fs = require('fs');

app.use(express.static(__dirname + '/node_modules'));
app.get('/*', function (req, res, next) {
    handler(req, res);
});

app.post('/joinRoom', function (req, res) {
    var fileToLoad = fs.readFileSync('join-room.html', "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fileToLoad);
    res.end();
});

app.post('/waitRoom', function (req, res) {
    // console.log(req.);
    var fileToLoad = fs.readFileSync('waiting-room.html', "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fileToLoad);
    res.end();
});


app.post('/joinTeam', function (req, res) {
    var fileToLoad = fs.readFileSync('start-game.html', "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fileToLoad);
    res.end();
});

app.post('/startGame', function (req, res) {
    var fileToLoad = fs.readFileSync('game.html', "utf8");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fileToLoad);
    res.end();
});


function handler(req, res) {
    var pathname = url.parse(req.url).pathname;
    var isImage = 0, contentType, fileToLoad;
    var extension = pathname.split('.').pop();
    var file = "." + pathname;
    var dirs = pathname.split('/');
    if (pathname == "/") {
        file = "index.html";
        contentType = 'text/html';
        isImage = 2;
    } else if (dirs[1] != "hidden" && pathname != "/app.js") {
        switch (extension) {
            case "jpg":
                contentType = 'image/jpg';
                isImage = 1;
                break;
            case "png":
                contentType = 'image/png';
                isImage = 1;
                break;
            case "js":
                contentType = 'text/javascript';
                isImage = 2;
                break;
            case "css":
                contentType = 'text/css';
                isImage = 2;
                break;
            case "html":
                contentType = 'text/html';
                isImage = 2;
                break;
        }
    }
    if (isImage == 1) {
        fileToLoad = fs.readFileSync(file);
        res.writeHead(200, {'Content-Type': contentType});
        res.end(fileToLoad, 'binary');
    } else if (isImage == 2) {
        fileToLoad = fs.readFileSync(file, "utf8");
        res.writeHead(200, {'Content-Type': contentType});
        res.write(fileToLoad);
        res.end();
    }
}

io.on('connection', socket => {
	console.log('Client connected...');

    socket.on('mouseDown', function (data) {
		console.log(data);
		io.sockets.emit("mouseDownClient"+ data);
	});
});

server.listen(4200);