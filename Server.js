const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
// var port = process.env.PORT;
app.get('*', function (req, res) {
    res.sendFile('index.html');
  });
// app.get('/', function(req, res) {
//     console.log('__dirname',__dirname)
//     res.sendFile(path.join(__dirname + '/dist/election-frntnew/index.html'));
// });

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));