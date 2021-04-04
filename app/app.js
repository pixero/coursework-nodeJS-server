const express = require('express');
const app = express();

const path = __dirname + '/views/';
const port = 8080;

const jwt = require('jsonwebtoken');

app.use(express.static(path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/auth',(req,res)=>{
  console.log(req.body)
  const token = jwt.sign({
    data: `${req.body.name},${req.body.password}`
  },'secret');
  res.send(token);
})

app.post('/registration',(req,res)=>{
  res.send(true)
})

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})