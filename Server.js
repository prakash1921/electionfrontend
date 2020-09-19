const express = require('express');
const app = express();
const path = require('path');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
// const port = process.env.PORT || 3000;
// var port = process.env.PORT;
// app.get('*', function (req, res) {
//     res.sendFile('index.html');
//   });
app.use(express.static(__dirname + '/dist/Election'));
// app.get('/', function(req, res) {
//     // console.log('__dirname',path.join(__dirname + '/src/index.html'))
//     // res.sendFile(path.join(__dirname + '/src/index.html'));
    
//     // res.sendFile(path.join(__dirname + '/src/index.html'));
//     // res.sendFile(path.join(__dirname + '/src/app/app.module.ts'));
//     res.sendFile('index.html', { root: 'dist/Election' }

// });
app.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/Election/index.html'));
    });
app.listen(port,host, () => console.log(`url-shortener listening on port ${port}!`));

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));