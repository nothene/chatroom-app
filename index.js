const path = require('path');
const fs = require('fs');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var clients = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    }); 
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const server = http.createServer((req, res) => {
//     let filePath = path.join(
//         __dirname, 
//         'public', 
//         req.url === '/' ? 'index.html' : req.url)
//     ;

//     let extname = path.extname(filePath);

//     let contentType = 'text/html';

//     switch(extname){
//         case '.js':
//             contentType = 'text/javascript';
//             break;
//         case '.js':
//             contentType = 'text/javascript';
//             break;            
//         case '.js':
//             contentType = 'text/javascript';
//             break;
//         case '.js':
//             contentType = 'text/javascript';
//             break;                
//     }

//     fs.readFile(filePath, (err, content) => {
//         if(err){
//             if(err.code == 'ENOENT'){
//                 fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) =>{
//                     res.writeHead(200, {'Content-Type' : 'text/html'});
//                     res.end(content, 'utf8');
//                 })
//             } else{
//                 res.writeHead(500);
//                 res.end(`Serv// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));er Error: ${err.code}`);
//             }
//         } else{
//             res.writeHead(200, {'Content-Type' : contentType});
//             res.end(content, 'utf8');
//         }
//     });

// });

