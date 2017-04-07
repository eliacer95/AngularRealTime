
/**
 * Created by Eliacer on 3/04/2017.
 */
//setup
var express = require("express");
var http = require("http");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var server = http.createServer(app);
var io = require("socket.io").listen(server);

//Configuracion
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static('./src/client'));//Setea los achivos estaticos
app.use('/', express.static('./node_modules'));

//initialize socket.io
io.on('connection', function(socket){
    console.log('a user connected');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    var data = {
        cpuPct: 10.0,
        time: new Date()
    };

    setInterval(function () {

        socket.emit('metricServiceDataEvent', data);

        var r = Math.random();
        data.cpuPct += 15 * r - 7.5;
        if (data.cpuPct > 100) {data.cpuPct = 100};
        if (data.cpuPct < 0) {data.cpuPct = 0};

        data.time = new Date();

    }, 1000);
});

//application
app.get('*', function (req, res) {
    res.sendfile('./src/client/index.html'); // Angular manejara los cambios a
    // travez de esta vista en el fronted
});

//Listen (La app comienza escuchar en el puerto 8000)
server.listen(8000);
console.log("app listening on port 8000");