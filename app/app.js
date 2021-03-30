const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

const path = __dirname + '/views/';
const port = 8080;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);

app.use(express.static(path));

app.get('/test',(req,res)=>{
  res.send("work");
})

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})