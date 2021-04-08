const express           = require('express');
const cors              = require('cors');
const bodyParser        = require('body-parser');
const MongoClient       = require('mongodb').MongoClient;
const db                = require('./config/db');
const app               = express();
// const path = __dirname + '/views/';
const port = 8080;


// app.use(express.static(path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', cors());



MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  // Make sure you add the database name and not the collection name
  const db = database.db('course-work')
  require('./routes')(app, db);
  app.listen(port, () => {
    console.log('Server working on port: ' + port);
  });
})
