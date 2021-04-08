const express = require('express');
const app = express();
const cors = require('cors')

// const path = __dirname + '/views/';
const port = 8080;


// app.use(express.static(path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());


require('./routes')(app,{});

app.listen(port, ()=> {
  console.log('Example app listening on port 8080!')
})
