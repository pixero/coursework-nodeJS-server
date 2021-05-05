const express           = require('express');
const cors              = require('cors');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const dbConfig          = require('./config/db');
const app               = express();
// const path = __dirname + '/views/';
const port = 8081;


// app.use(express.static(path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', cors());


mongoose.connect(dbConfig.url,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    require('./routes')(app, db);
    app.listen(port, () => {
        console.log('Server working on port: ' + port);
    });
});
